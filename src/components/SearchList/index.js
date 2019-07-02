import React from 'react';
import GlobalStyle from '../../styles';
import { Container, Content } from './styles';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


const SearchList = ( props ) => (
    <Container>
         <Content>
            <ListGroup>
                {
                    props.bulas.map(bula => (
                        <ListGroupItem key={bula.id} tag="button" onClick={() => props.handleClick(bula.id)} action>
                            <ListGroupItemHeading>
                                {bula.nomeComercial}
                            </ListGroupItemHeading>
                            <ListGroupItemText>
                                {bula.fabricante}
                            </ListGroupItemText>
                        </ListGroupItem>
                    ))
                }
            </ListGroup>

        </Content>
        <GlobalStyle />
    </Container>
)

export default SearchList;
