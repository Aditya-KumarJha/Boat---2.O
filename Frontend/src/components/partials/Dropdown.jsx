import React from 'react'

const Dropdown = ({title, options, func}) => {
    return (
        <div className='select'>
            <select defaultValue="0" onChange={func} name="format" id="format">
                <option value="0" disabled>
                    {title}
                </option>
                {options.map((o,i) => (
                    <option value={o} key={i}>
                        {o.toUpperCase()}
                    </option>
                ))}
            </select>             
        </div>
    );
};

export default Dropdown;
