import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  handleInput = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase().trim() });
  };

  reset = () => {
    this.setState({ query: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.reset();
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handleInput}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.query}
        />
      </SearchFormStyled>
    );
  }
}
