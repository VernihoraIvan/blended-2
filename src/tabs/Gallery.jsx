import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: true,
    isVisible: false,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  onSubmit = value => {
    this.setState({
      images: [],
      query: value,
      page: 1,
      isEmpty: true,
      isVisible: false,
      error: null,
    });
  };

  getPhotos = async (query, page) => {
    if (!query) {
      return;
    }
    this.setState({ isLoading: true });
    try {
      const {
        photos,
        total_results,
        page: currentPage,
        per_page,
      } = await ImageService.getImages(query, page);
      if (photos.legth === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isEmpty: false,
        isVisible: currentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadeMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isEmpty, isVisible, error, isLoading } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {error && <Text textAlign="center">Sorry.{error} 😭</Text>}

        <Grid>
          {images &&
            images.map(({ id, avg_color, alt, src }) => {
              return (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img src={src.large} alt={alt} />
                  </CardItem>
                </GridItem>
              );
            })}
        </Grid>
        {isVisible && (
          <Button type="button" onClick={this.onLoadeMore} disabled={isLoading}>
            {isLoading ? 'Loading' : 'pagination'}
          </Button>
        )}
      </>
    );
  }
}
