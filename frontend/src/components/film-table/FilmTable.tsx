import * as React from 'react';
import * as css from './FilmTable.scss';
import { FilmEntry, FilmGenre } from '../../data/table-entry';
import { WrappedState as FilmEntriesState } from '../../reducers/film-entry-reducer';
import { isEmpty } from 'lodash';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

interface FilmTableState {
  editingEntry: FilmEntry
}

export default class FilmTable extends React.Component<FilmEntriesState, FilmTableState> {
  constructor(props: FilmEntriesState) {
    super(props);
    this.state = this.initalState();
  }

  initalState = (): FilmTableState => ({
    editingEntry: {
      id: -1,
      name: '',
      description: '',
      genre: FilmGenre.NONE,
      grade: 0,
      timeLength: 0,
      releaseDate: moment().unix(),
      isWatched: false
    }
  })

  get filmEntries() {
    return this.props.entryState.filmEntries;
  }

  renderTableRows() {
    return this.filmEntries.map((entry: FilmEntry) => (
      <tr key={entry.id}>
        <td className={css.filmTableContentRowCellName}>{entry.name}</td>
        <td className={css.filmTableContentRowCellDescription}>{entry.description}</td>
        <td className={css.filmTableContentRowCellReleaseDate}>{entry.releaseDate}</td>
        <td className={css.filmTableContentRowCellRunningTime}>{entry.timeLength}</td>
        <td className={css.filmTableContentRowCellGenres}>{entry.genre}</td>
        <td className={css.filmTableContentRowCellGrade}>{entry.grade}</td>
        <td className={css.filmTableContentRowCellWatched}>{entry.isWatched}</td>
        <td className={css.filmTableContentRowCellAction}>
          <button className={css.btnPrimary}>✎</button>
          <button className={css.btnDanger}>✖</button>
        </td>
      </tr>
    ));
  }

  renderCreateEntryRow() {
    let { editingEntry } = this.state;
    let releaseDate = moment.unix(this.state.editingEntry.releaseDate)
    return (
      <tr className="new-entry">
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
            onChange={(e: any) => this.onDescriptionChange}
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
            type="number"
            className={css.filmTableFormControl}
            onChange={(e: any) => this.onTimeLengthChange(e)}
          />
        </td>
        <td className={css.filmTableContentRowCellGenres}>
          <input
            type=""
            className={css.filmTableFormControl}
          />
        </td>
        <td className={css.filmTableContentRowCellGrade}>
          <input className={css.filmTableFormControl} />
        </td>
        <td className={css.filmTableContentRowCellWatched}>
          <input
            checked={editingEntry.isWatched}
            type="checkbox"
            className={css.filmTableFormControl}
            onChange={(e: any) => this.onIsWatchedChange(e)}
          />
        </td>
        <td className={css.filmTableContentRowCellAction}>
          <button className={css.btnSuccess}>+</button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div className={css.filmTable}>
        <table className={css.filmTableContent}>
          <thead className={css.filmTableContentRowHead}>
            <tr>
              <td className={css.filmTableContentRowCellName}>Name</td>
              <td className={css.filmTableContentRowCellDescription}>Description</td>
              <td className={css.filmTableContentRowCellReleaseDate}>Release date</td>
              <td className={css.filmTableContentRowCellRunningTime}>Running time</td>
              <td className={css.filmTableContentRowCellGenres}>Genres</td>
              <td className={css.filmTableContentRowCellGrade}>Grade</td>
              <td className={css.filmTableContentRowCellWatched}>Watched</td>
              <td className={css.filmTableContentRowCellAction}>Action</td>
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
    })
  }

  onDescriptionChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        description: event.target.value
      }
    })
  }

  onReleaseDateChange = (date: moment.Moment) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        releaseDate: date.unix()
      }
    })
  }

  onTimeLengthChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        timeLength: Math.floor(event.target.value)
      }
    })
  }

  onGenresChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        description: event.target.value
      }
    })
  }

  onIsWatchedChange = (event: any) => {
    this.setState({
      editingEntry: {
        ...this.state.editingEntry,
        isWatched: event.target.checked
      }
    })
  } 
}