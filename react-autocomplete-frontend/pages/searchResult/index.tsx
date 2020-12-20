import React, { useEffect, useState } from 'react';
import BackendApi from 'utils/backed-api';
import { UserInfo } from '@interface/common';
import Option from '@components/Option/option';
import { useRouter } from 'next/router';
import { NO_RESULTS_FOUND_TEXT } from '@constants/common';

const SearchResult = () => {
    const [listOptions, setListOptions] = useState<Array<UserInfo>>([]);
    const [activeKey, setActiveKey] = useState(0);
    const router = useRouter();
    let searchString: string;
    if (router.query.searchString) {
        searchString = router.query.searchString.toString();
    }

    useEffect(() => {
        BackendApi.searchUsers(searchString).then(res => {
            if (res.statusCode === 200) {
                setListOptions(res.data);
            }
        }).catch(err => {
            console.error(err);
        }).finally(() => {
        });
    }, [listOptions]);

    const handleMouseOver = (index: number) => {
        setActiveKey(index);
    };

    return <div>
        {listOptions.length > 0 ?
            <Option
                listOptions={listOptions}
                activeKey={activeKey}
                handleMouseOver={handleMouseOver}
                searchInProgress={false}
                inputValue={searchString}
                isSuggestionList={false}
            />
            : <p>{NO_RESULTS_FOUND_TEXT}</p>
        }
    </div>;
};

export default SearchResult;