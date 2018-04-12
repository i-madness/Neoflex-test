import * as React from 'react';
import * as css from './FilmTable.scss';
import store from '../../redux/store'
import { FilmEntry } from '../../data/table-entry';
import { WrappedState as FilmEntriesState } from '../../reducers/film-entry-reducer';
import { ENTRY_CREATE_REQUEST, ENTRY_MODIFY_REQUEST, ENTRY_DELETE_REQUEST } from '../../reducers/film-entry-actions'
import { differenceWith, isEmpty, isEqual, orderBy } from 'lodash';
import { fetchGenres } from '../../data/rest-client'
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const Autocomplete = require('react-autocomplete'); // no typings

interface TableField {
  name: string,
  display: string,
  className: string
}

const tableFields = {
  NAME: { name: 'name', display: 'Name', className: css.filmTableContentRowCellName },
  DESCRIPTION: { name:'description', display: 'Description', className: css.filmTableContentRowCellDescription },
  RELEASE_DATE: { name: 'releaseDate', display: 'Release date', className: css.filmTableContentRowCellReleaseDate },
  RUNNUNG_TIME: { name: 'timeLength', display: 'Running time', className: css.filmTableContentRowCellRunningTime },
  GENRE: { name: 'genre', display: 'Genre', className: css.filmTableContentRowCellGenres },
  GRADE: { name: 'grade', display: 'Grade', className: css.filmTableContentRowCellGrade },
  WATCHED: { name: 'watched', display: 'Watched', className: css.filmTableContentRowCellWatched }
}

interface FilmTableState {
  editingEntry: FilmEntry,
  genreFieldText: string,
  genreAvailableOptions: String[],
  sortField: TableField,
  isOrderAsc: boolean,
  newEntryId: number,
  modifiedEntryId: number,
  disappearingEntry?: FilmEntry // when we click delete button this entry stays in table for 3 sec.
}

export default class FilmTable extends React.Component<FilmEntriesState, FilmTableState> {
  genreAutocompleteConfig = {
    renderItem: (item: any, isHighlighted: boolean) => (
      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item + Math.random()}>
        {item}
      </div>
    ),

    onChange: (event: any) => {
      if (!event.target || isEmpty(event.target.value)) {
        return;
      }
      const { value } = event.target;
      this.setState({ genreFieldText: value });
      fetchGenres(value)
        .catch(console.error)
        .then((response: Array<string>) => {
          if (isEmpty(response)) {
            this.setState({ genreAvailableOptions: [] });
          } else if (response.find(genre => genre === value)) {
            this.setState({
              editingEntry: { ...this.state.editingEntry, genre: value },
              genreFieldText: value,
              genreAvailableOptions: []
            });
          } else {
            this.setState({ genreAvailableOptions: response, genreFieldText: value });
          }
        });
    },

    onSelect: (value: string) => {
      this.setState({
        editingEntry: { ...this.state.editingEntry, genre: value },
        genreFieldText: value
      });
    }
  }

  constructor(props: FilmEntriesState) {
    super(props);
    this.state = this.initalState();
  }

  initalState = (): FilmTableState => ({
    editingEntry: {
      id: -1, // id === -1 means that form is not in state of editing existing entry 
      name: '',
      description: '',
      genre: '',
      grade: 1,
      timeLength: 0,
      releaseDate: moment().valueOf(),
      watched: false
    },
    genreFieldText: '',
    genreAvailableOptions: [],
    sortField: tableFields.NAME,
    isOrderAsc: true,
    newEntryId: -1,
    modifiedEntryId: -1,
    disappearingEntry: undefined
  })

  get filmEntries(): Array<FilmEntry> {
    return orderBy(
      (this.props.entryState.filmEntries || []).concat(this.state.disappearingEntry ? this.state.disappearingEntry : []),
      this.state.sortField.name,
      this.state.isOrderAsc ? 'asc' : 'desc'
    );
  }

  get isEditing(): boolean {
    return this.state.editingEntry.id !== -1;
  }

  componentWillReceiveProps(nextProps: FilmEntriesState) {
    if (!isEqual(this.props, nextProps)) {
      let oldEntries = this.props.entryState.filmEntries;
      let newEntries = nextProps.entryState.filmEntries;
      let diff: FilmEntry[] = differenceWith(newEntries, oldEntries, isEqual);
      if (isEmpty(diff)) {
        diff = differenceWith(oldEntries, newEntries, isEqual);
      }      
      if (diff.length === 1) {
        if (oldEntries.length < newEntries.length) {
          this.setState({ newEntryId: diff[0].id });
          setTimeout(() => this.setState({ newEntryId: -1 }), 3000);
        } else if (oldEntries.length > newEntries.length) {
          this.setState({ disappearingEntry: diff[0] });
          setTimeout(() => this.setState({ disappearingEntry: undefined }), 3000);
        } else {
          this.setState({ modifiedEntryId: diff[0].id });
          setTimeout(() => this.setState({ modifiedEntryId: -1 }), 3000);
        }
      }
    }
  }

  calculateRowClass(id: number): string {
    switch (id) {
      case this.state.newEntryId:
        return css.filmTableContentRowNew;
      case this.state.disappearingEntry ? this.state.disappearingEntry.id : NaN:
        return css.filmTableContentRowDeleted;
      case this.state.modifiedEntryId:
        return css.filmTableContentRowModified;
      case this.state.editingEntry.id:
        return css.filmTableContentRowEditing;
      default:
        return '';
    }
  }

  renderTableRows() {
    return this.filmEntries.map((entry: FilmEntry, i: number) => (
      <tr key={i} className={this.calculateRowClass(entry.id)}>
        <td className={css.filmTableContentRowCellName}>{entry.name}</td>
        <td className={css.filmTableContentRowCellDescription}>{entry.description}</td>
        <td className={css.filmTableContentRowCellReleaseDate}>{moment(entry.releaseDate).format('DD/MM/YYYY')}</td>
        <td className={css.filmTableContentRowCellRunningTime}>{entry.timeLength}</td>
        <td className={css.filmTableContentRowCellGenres}>{entry.genre}</td>
        <td className={css.filmTableContentRowCellGrade}>{entry.grade}</td>
        <td className={css.filmTableContentRowCellWatched}>{entry.watched ? 'Yes' : 'No'}</td>
        <td className={css.filmTableContentRowCellAction}>
          <button className={css.filmTableEditAction} onClick={this.onEditButtonClick(entry)}>✎</button>
          <button className={css.filmTableDeleteAction} onClick={this.onDeleteButtonClick(entry.id)}>✖</button>
        </td>
      </tr>
    ));
  }

  renderCreateEntryRow() {
    let { editingEntry } = this.state;
    let releaseDate = moment(this.state.editingEntry.releaseDate)
    return (
      <tr className={this.isEditing ? css.filmTableInputRowEditing : css.filmTableInputRow}>
        <td className={css.filmTableContentRowCellName}>
          <input
            value={editingEntry.name}
            className={css.filmTableFormControl}
            onChange={(e: any) => this.onNameChange(e)}
          />
        </td>
        <td className={css.filmTableContentRowCellDescription}>
          <textarea
            value={editingEntry.description}
            className={css.filmTableFormControl}
            onChange={(e: any) => this.onDescriptionChange(e)}
          />
        </td>
        <td className={css.filmTableContentRowCellReleaseDate}>
          <DatePicker
            selected={releaseDate}
            dateFormat="DD-MM-YYYY"
            className={css.filmTableFormControl}
            onChange={(date: moment.Moment) => this.onReleaseDateChange(date)}
          />
        </td>
        <td className={css.filmTableContentRowCellRunningTime}>
          <input
            value={this.state.editingEntry.timeLength}
            type="number"
            min={0}
            step={1}
            className={css.filmTableFormControl}
            onChange={(e: any) => this.onTimeLengthChange(e)}
          />
        </td>
        <td className={css.filmTableContentRowCellGenres}>
          <Autocomplete
            items={this.state.genreAvailableOptions}
            value={this.state.genreFieldText}
            className={css.filmTableFormControl}
            getItemValue={(item: String) => item}
            {...this.genreAutocompleteConfig}
          />
        </td>
        <td className={css.filmTableContentRowCellGrade}>
          <input
            value={this.state.editingEntry.grade}
            type="number"
            min={1}
            max={10}
            step={1}
            className={css.filmTableFormControl}
            onChange={(e: any) => this.onGradeChange(e)}
          />
        </td>
        <td className={css.filmTableContentRowCellWatched}>
          <input
            checked={editingEntry.watched}
            type="checkbox"
            className={css.filmTableFormControl}
            onChange={(e: any) => this.onIsWatchedChange(e)}
          />
        </td>
        <td className={css.filmTableContentRowCellAction}>
          <button onClick={() => this.onAddButtonClick()} className={css.filmTableAddAction}>+</button>
          <button onClick={() => this.onClearButtonClick()} className={css.filmTableClearAction}>⌫</button>
        </td>
      </tr>
    );
  }

  render() {
    let headRows = Object.keys(tableFields)
      .map((field: any, i: number) => {
        let tableField = tableFields[field];
        return (
          <td key={i} className={tableField.className} onClick={() => this.onHeadRowCellClick(tableField)}>
            {tableField.display}
          </td>
        )
      });
    return (
      <div className={css.filmTable}>
        <table className={css.filmTableContent}>
          <thead className={css.filmTableContentRowHead}>
            <tr>
              {headRows}
              <td className={css.filmTableContentRowCellAction} />
            </tr>
          </thead>
          <tbody>
            {this.renderCreateEntryRow()}
            {!isEmpty(this.filmEntries) && this.renderTableRows()}
          </tbody>
        </table>
        {isEmpty(this.filmEntries) && <div className={css.filmTableEmptyMessage}>Nothing to show</div>}
      </div>
    );
  }

  onNameChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        name: event.target.value
      }
    });
  }

  onDescriptionChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        description: event.target.value
      }
    });
  }

  onReleaseDateChange = (date: moment.Moment) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        releaseDate: date.valueOf()
      }
    });
  }

  onTimeLengthChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        timeLength: Math.floor(event.target.value)
      }
    })
  }

  onGradeChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        grade: event.target.value
      }
    });
  }

  onIsWatchedChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        watched: event.target.checked
      }
    });
  }

  // Button handlers

  onHeadRowCellClick = (tableField: TableField) => {
    if (isEqual(this.state.sortField, tableField)) {
      this.setState({
        isOrderAsc: !this.state.isOrderAsc
      });
    } else {
      this.setState({
        sortField: tableField,
        isOrderAsc: true
      });
    }
    
  }

  onAddButtonClick = () => {
    let payload = this.state.editingEntry;
    if (payload.id === -1) {
      store.dispatch({ type: ENTRY_CREATE_REQUEST, payload });
    } else {
      store.dispatch({ type: ENTRY_MODIFY_REQUEST, payload });
    }
    this.setState(this.initalState())
  }

  onClearButtonClick = () => {
    this.setState(this.initalState());
  }

  onEditButtonClick = (entry: FilmEntry) => () => {
    this.setState({
      editingEntry: entry,
      genreFieldText: entry.genre
    });
  }

  onDeleteButtonClick = (id: number) => () => {
    store.dispatch({ type: ENTRY_DELETE_REQUEST, payload: id });
    if (this.state.editingEntry.id === id) {
      this.setState(this.initalState());
    }
  }
}