import * as React from 'react';
import * as css from './Layout.scss';
import { connect } from 'react-redux';
import FilmTable from '../film-table/FilmTable';
import { WrappedState as FilmEntriesState } from '../../reducers/film-entry-reducer';

class Layout extends React.Component<FilmEntriesState> {
  render() {
    return (
      <div className={css.layout}>
        <header className="app-header">
          <h3 id={css.appTitle}>My film list</h3>
        </header>
        <div className={css.layoutContainer}>
          <FilmTable {...this.props} />
        </div>
      </div>
    );
  }
}

export default connect((state: FilmEntriesState) => state)(Layout);
