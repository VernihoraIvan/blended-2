import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: true,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    this.getPhotos(query, page);
  }

  onSubmit = value => {
    this.setState({ query: value });
  };

  getPhotos = async (query, page) => {
    if (!query) {
      return;
    }
    const { photos, total_results } = await ImageService.getImages(query, page);
    if (photos.legth === 0) {
      this.setState({ isEmpty: true });
    }
    this.setState({ images: [...photos], isEmpty: false });
  };

  render() {
    const { images, isEmpty } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}

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
      </>
    );
  }
}
