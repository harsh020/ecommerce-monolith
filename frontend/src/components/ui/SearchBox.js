import React, {useState} from 'react';
import {Form, Button, InputGroup} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

function SearchBox(props) {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.length > 0) {
            navigate(`/app?q=${keyword}&page=1`);
        }
        else {
            navigate(location.pathname);
        }
    }

    return (
        <Form onSubmit={submitHandler}>
            <InputGroup>
                <Form.Control
                    type={'text'}
                    value={keyword}
                    name={'q'}
                    size={'sm'}
                    className={'mr-sm-3 ml-sm-5'}
                    placeholder={'Search'}
                    onChange={(e) => setKeyword(e.target.value)} />

                <Button
                    type={'submit'}
                    variant={'outline-success'}
                    className={'mr-sm-5'}>
                    <i className={'fa fa-search'} />
                </Button>
            </InputGroup>


        </Form>
    );
}

export default SearchBox;