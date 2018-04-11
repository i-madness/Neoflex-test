import * as React from 'react';
import * as css from './FilmTable.scss';
import { FilmEntry } from '../../data/table-entry';
import { WrappedState as FilmEntriesState } from '../../reducers/film-entry-reducer';
import { isEmpty } from 'lodash';

export default class FilmTable extends React.Component<FilmEntriesState> {
  get filmEntries() {
    return this.props.entryState.filmEntries
  }

  renderTableRows() {
    return this.filmEntries.map((entry: FilmEntry) => (
      <tr key={entry.id}>
        <td>{entry.name}</td>
        <td>{entry.description}</td>
        <td>{entry.releaseDate}</td>
        <td>{entry.timeLength}</td>
        <td>{entry.genres.join(',')}</td>
        <td>{entry.grade}</td>
        <td>{entry.isWatched}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className={css.filmTable}>
        <table className={css.filmTableContent}>
          <thead>
            <td>Name</td>
            <td>Description</td>
            <td>Release date</td>
            <td>Running time</td>
            <td>Genres</td>
            <td>Grade</td>
            <td>Watched</td>
          </thead>
          <tbody>
            {isEmpty(this.filmEntries) && 'Nothing to show'}
            {!isEmpty(this.filmEntries) && this.renderTableRows()}
          </tbody>
        </table>
      </div>
    );
  }
}