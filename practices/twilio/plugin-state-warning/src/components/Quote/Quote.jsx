/* archivo: src/components/Quote/Quote.jsx */

import React, { Component } from 'react';
import { withTheme } from '@twilio/flex-ui';

// importación de componentes estilizados simples
import {
  QuoteComponentStyled, HeaderLine, Header, QuoteBody, QuoteAuthor
} from './Quote.Styles';

// URL de la API de quotable para obtener citas
const url = `https://api.quotable.io/random?tags=life`;

// el componente principal
class QuoteComponent extends Component {
  
  // inicializar variables de estado
  constructor(props) {
    super(props);
    this.state = {
      quote: null,    // cuerpo de la cita
      author: null,   // autor de la cita
      loaded: false,  // ¿se ha completado la carga?
      error: null     // ¿ocurrió un error?
    };
  }

  componentDidMount() {
    // una vez que el componente se monte, recuperamos la cita aleatoria de la API...
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // ...y la almacenamos en el estado del componente
        this.setState({
          quote: json.content,
          author: json.author,
          loaded: true
        });
      })
      // si ocurrió un error, guardamos su descripción
      .catch((error) => this.setState({ error, loaded: true }));
  }

  render() {
    // extraemos variables del estado
    const { quote, author, error, loaded } = this.state;
    let value = quote;

    // mostramos el mensaje de error o de carga si es necesario
    if (error) {
      console.error(error);
      value = `Error: ${error}`;
    }
    if (!loaded) {
      value = 'Cargando...';
    }

    // y finalmente renderizamos la cita utilizando los componentes estilizados
    return (
      <QuoteComponentStyled>
        <HeaderLine>
          <Header>Cita del Día</Header>
        </HeaderLine>
        <QuoteBody>{value}</QuoteBody>
        <QuoteAuthor>{author ? author : ''}</QuoteAuthor>
      </QuoteComponentStyled>
    );
  }
}

// usamos el HOC `withTheme` para hacer que nuestro componente sea consciente del tema
export default withTheme(QuoteComponent);