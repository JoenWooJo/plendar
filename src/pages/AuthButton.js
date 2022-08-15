import React from 'react';

const AuthButton =  ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
)   ;

export default AuthButton;