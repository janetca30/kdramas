import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import arrowDown from "../../assets/arrowDown.png";
import './ListDoramas.css';


const ListDoramas = ({ value, onChange, options, class1, class2, class3, class4 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        onChange({ target: { name: 'dorama', value: option } });
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="listOption" ref={dropdownRef}>
            <label>Dorama:</label>
            <div className="dropdown" onClick={handleToggleDropdown}>
                <div className={`${class1}`}>
                    {value || "Select drama"}
                </div>
                <img className="arrowDown" src={arrowDown} alt='arrowDown' />
            </div>
            {isOpen && (
                <ul className="listDropdown">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className={`${class2} ${class3} ${class4}`}
                            onClick={() => handleSelectOption(option.name)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

ListDoramas.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    class1: PropTypes.string.isRequired,
    class2: PropTypes.string.isRequired,
    class3: PropTypes.string,
    class4: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            doramaColor: PropTypes.string.isRequired
        })
    ).isRequired
};

export default ListDoramas;
