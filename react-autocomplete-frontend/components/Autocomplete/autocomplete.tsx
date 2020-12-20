import React, { useState } from 'react';
import { UserInfo } from '@interface/common';
import BackendApi from 'utils/backed-api';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Option from '@components/Option/option';
import { UrlObject } from 'url';
import { AUTOCOMPLETE_PLACEHOLDER, SEARCH_PAGE_URL, USER_PAGE_URL } from '@constants/common';

const Autocomplete = () => {
    const [activeKey, setActiveKey] = useState<number>(0);
    const [listOptions, setListOptions] = useState<Array<UserInfo>>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
    const [currentTimeoutId, setCurrentTimeoutId] = useState<number | undefined>(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        setInputValue(inputValue);
        if (inputValue && inputValue.length >= 3) {
            if (currentTimeoutId) {
                window.clearTimeout(currentTimeoutId);
            }
            const timeoutId = window.setTimeout(() => {
                handleSearch(inputValue);
            }, 500);
            setCurrentTimeoutId(timeoutId);
        }
        else {
            setListOptions([]);
        }
    };

    const handleSearch = (inputValue: string) => {

        setSearchInProgress(true);
        return BackendApi.searchUsers(inputValue).then(res => {
            if (res.statusCode == 200) {
                setActiveKey(0);
                setListOptions(res.data);
            }
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setSearchInProgress(false);
        });


    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        let currKey: number = activeKey;
        let performAction: boolean = false;
        let href: UrlObject;

        switch (e.key) {
            case "Enter":
                if (activeKey > 0) {
                    href = {
                        pathname: USER_PAGE_URL,
                        query: { userId: listOptions[activeKey - 1].id }
                    };
                }
                else {
                    href = {
                        pathname: SEARCH_PAGE_URL,
                        query: { searchString: inputValue }
                    };
                }
                router.push(href);
                break;
            case "ArrowUp":
                e.preventDefault();
                currKey -= 1;
                if (currKey < 0) {
                    currKey = listOptions.length;
                }
                performAction = true;
                break;
            case "ArrowDown":
                e.preventDefault();
                currKey += 1;
                if (currKey > listOptions.length) {
                    currKey = 0;
                }
                performAction = true;
                break;
            default:
                break;
        }
        if (performAction) {
            if (currKey === 0) {
                scrollIntoView(1);
            }
            else {
                scrollIntoView(currKey);
            }
            setActiveKey(currKey);
        }
    };

    const handleMouseOver = (index: number) => {
        scrollIntoView(index);
        setActiveKey(index);
    };

    const scrollIntoView = (index: number) => {
        const element = document.getElementById(`option${index}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    };

    const showOptionsComponent = () => {
        setShowOptions(true);
    };

    const hideOptions = () => {
        // this.setState({ showOptions: false });
    };



    return (
        <div className={styles["autocomplete"]}>
            <input
                className={styles["input"]}
                type="search"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={showOptionsComponent}
                onBlur={hideOptions}
                placeholder={AUTOCOMPLETE_PLACEHOLDER}
            />
            {showOptions &&
                <Option
                    listOptions={listOptions}
                    activeKey={activeKey}
                    handleMouseOver={handleMouseOver}
                    searchInProgress={searchInProgress}
                    inputValue={inputValue}
                    isSuggestionList={true}
                />
            }
        </div>
    );
};
export default Autocomplete;