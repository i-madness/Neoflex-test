import * as React from 'react';
import * as css from './FilmTable.scss';
import { FilmEntry, FilmGenre } from '../../data/table-entry';
import { WrappedState as FilmEntriesState } from '../../reducers/film-entry-reducer';
import { isEmpty } from 'lodash';

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
      releaseDate: 0,
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
      </tr>
    ));
  }

  renderCreateEntryRow() {
    return (
      <tr className="new-entry">
        <td className={css.filmTableContentRowCellName}>
          <input className={css.filmTableActionInput} />
        </td>
        <td className={css.filmTableContentRowCellDescription}>
          <input className={css.filmTableActionInput} />
        </td>
        <td className={css.filmTableContentRowCellReleaseDate}>
          <input className={css.filmTableActionInput} />
        </td>
        <td className={css.filmTableContentRowCellRunningTime}>
          <input type="number" className={css.filmTableActionInput} />
        </td>
        <td className={css.filmTableContentRowCellGenres}>
          <input className={css.filmTableActionInput} />
        </td>
        <td className={css.filmTableContentRowCellGrade}>
          <input className={css.filmTableActionInput} />
        </td>
        <td className={css.filmTableContentRowCellWatched}>
          <input onChange={(e: any) => this.onIsWatchedChange(e)} type="checkbox" className={css.filmTableActionInput} />
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