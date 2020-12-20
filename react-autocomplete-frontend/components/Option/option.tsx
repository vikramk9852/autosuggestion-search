import React from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { UserInfo } from '@interface/common';
import {
    BLUE_COLOR, ENTER_MORE_CHARS_TEXT,
    NO_RESULTS_FOUND_TEXT, SEARCHING_TEXT,
    USER_PAGE_URL
} from '@constants/common';


const Option = ({
    listOptions, activeKey, isSuggestionList,
    handleMouseOver, searchInProgress, inputValue
}) => {

    const getHighlightedText = (str: string) => {
        const parts = str.split(new RegExp(`(${inputValue})`, 'gi'));
        return <span> {parts.map((part: string, i: number) =>
            <span
                key={i}
                style={part.toLowerCase() === inputValue.toLowerCase() ? { color: BLUE_COLOR } : {}}
            >
                {part}
            </span>)
        } </span>;
    };
    let className: string;
    if (isSuggestionList) {
        className = "suggestion-list";
    }

    return (
        <div className={`${styles["options"]} ${styles[className]}`}>
            {listOptions.length ?
                listOptions.map((value: UserInfo, index: number) => {
                    let className: string;
                    if (index + 1 === activeKey) {
                        className = styles['active-option'];
                    }
                    return (
                        <Link
                            href={{
                                pathname: USER_PAGE_URL,
                                query: { userId: value.id }
                            }}
                            key={index + 1}
                        >
                            <div
                                className={`${styles['row']} ${className}`}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                id={`option${index + 1}`}
                            >
                                <h3 className={styles["option-id"]}>
                                    {getHighlightedText(value.id)}
                                </h3>
                                <p className={styles["option-name"]}>
                                    {getHighlightedText(value.name)}
                                </p>
                                <p className={styles["option-address"]}>
                                    {getHighlightedText(value.address)}
                                </p>
                            </div>
                        </Link>
                    );
                })
                :
                <div>
                    {
                        searchInProgress ?
                            <div>{SEARCHING_TEXT}</div>
                            :
                            <div>
                                {
                                    inputValue && inputValue.length >= 3 ?
                                        <p>{NO_RESULTS_FOUND_TEXT}</p>
                                        :
                                        <p>{ENTER_MORE_CHARS_TEXT}</p>
                                }
                            </div>
                    }
                </div>
            }
        </div>
    );
};

Option.propTypes = {
    listOptions: PropTypes.array,
    activeKey: PropTypes.number,
    handleOptionItemClick: PropTypes.func,
    handleMouseOver: PropTypes.func,
    searchInProgress: PropTypes.bool,
    inputValue: PropTypes.string,
    isSuggestionList: PropTypes.bool
};

export default Option;