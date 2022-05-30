import React, {useState} from 'react';
import {Form, Pagination} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function Paginate(props) {
    const {page, pages, search='', redirect=''} = props;

    return pages > 0 && (
        <Pagination>
            {
                [...Array(pages).keys()].map(x => (
                    <LinkContainer
                        key={x + 1}
                        to={`/app${redirect}?${search.length > 0 ? `q=${search}&` : ''}page=${x + 1}`}
                    >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))
            }
        </Pagination>
    );
}

export default Paginate;