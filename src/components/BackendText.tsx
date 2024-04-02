import React from 'react';

interface BackendTextComponentProps {
    description: string;
}

const BackendText: React.FC<BackendTextComponentProps> = ({ description }) => {
    // Parse the backend text to extract and render HTML tags
    const renderText = (text: string): JSX.Element[] => {
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(text, 'text/html');
        const elements = parsedHtml.body.childNodes;


        // Render each child element
        return Array.from(elements).map((element, index) => {
            const tagName = (element as Element).nodeName.toLowerCase();
            const style = {
                marginBottom: tagName === 'p' ? '1em' : undefined,
                fontStyle: tagName === 'em' ? 'italic' : undefined,
                fontSize: tagName === 'h2' ? '1.5em' : undefined,
            };
            if (tagName === 'p' || tagName === 'strong' || tagName === 'em') {
                return React.createElement(tagName, { key: index, style }, element.textContent);
            } else if (tagName === 'h2') {
                return React.createElement(tagName, { key: index, style }, element.textContent);
            } else {
                return null;
            }
        }).filter(Boolean) as JSX.Element[];
    };

    return (
        <div>
            {renderText(description)}
        </div>
    );
}        


export default BackendText;
