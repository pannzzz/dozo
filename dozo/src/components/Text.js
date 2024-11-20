    import React from 'react';

    const styles = {
    Text: {
        color: '#000000',
        fontSize: '20px',
        fontFamily: 'Noto Sans JP, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        fontWeight: 500,
        lineHeight: '12px',
        marginTop: '-21px',
        marginLeft: '0px',
    },
    };

    const defaultProps = {
    text: 'Encuentra tu estilo con unos clicks',
    };

    const Text = (props) => {
    return (
        <div style={styles.Text}>
        {props.text ?? defaultProps.text}
        </div>
    );
    };

    export default Text;
