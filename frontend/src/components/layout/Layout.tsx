import * as React from 'react';
import * as css from './Layout.scss';
import { connect } from 'react-redux';
import FilmTable from '../film-table/FilmTable';
import ApplicationError from '../../data/application-error';
import { WrappedState as FilmEntriesState } from '../../reducers/film-entry-reducer';
import { isEqual } from 'lodash';

interface LayoutState {
  showError: boolean;
}

class Layout extends React.Component<FilmEntriesState, LayoutState> {
  constructor(props: FilmEntriesState) {
    super(props);
    this.state = {
      showError: false
    };
  }

  render() {
    return (
      <div className={css.layout}>
        <header className="app-header">
          <h3 id={css.appTitle}>My film list</h3>
        </header>
        <div className={css.layoutContainer}>
          <FilmTable {...this.props} />
        </div>
        {this.state.showError && this.renderErrors()}
      </div>
    );
  }

  componentWillReceiveProps(nextProps: FilmEntriesState) {
    if (!isEqual(this.props, nextProps)) {
      let { fetchFailure, entryModificationFailure, entryCreationFailure, entryDeleteFailure, clientError } = nextProps.entryState;
      if (fetchFailure || entryModificationFailure || entryCreationFailure || entryDeleteFailure || clientError) {
        this.setState({ showError: true });
        // After some delay we just hide the error pop-up
        setTimeout(() => this.setState({ showError: false }), 5000);
      }
    }
  }

  get currentError(): ApplicationError | undefined {
    let { fetchFailure, entryModificationFailure, entryCreationFailure, entryDeleteFailure, clientError } = this.props.entryState;
    return fetchFailure || entryModificationFailure || entryCreationFailure || entryDeleteFailure || clientError;
  }

  renderErrors() {
    return <div className={css.layoutErrorPanel}>{this.currentError && this.currentError.text}</div>;
  }
}

export default connect((state: FilmEntriesState) => state)(Layout);
