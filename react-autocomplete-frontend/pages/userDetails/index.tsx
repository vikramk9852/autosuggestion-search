import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserInfo } from '@interface/common';
import BackendApi from 'utils/backed-api';
import { NO_RESULTS_FOUND_TEXT } from '@constants/common';

const UserDetails = () => {

    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserInfo>();
    let userId: string;
    if (router.query.userId) {
        userId = router.query.userId.toString();
    }
    useEffect(() => {
        BackendApi.getUserByUserId(userId).then(res => {
            if (res.statusCode === 200) {
                setUserDetails(res.data);
            }
        }).catch(err => {
            console.error(err);
        });
    }, [userDetails]);
    return <div>
        {userDetails ?
            <div>
                <p>ID: {userDetails.id}</p>
                <p>Name: {userDetails.name}</p>
                <p>Address: {userDetails.address}</p>
                <p>Items: {userDetails.items}</p>
            </div>
            :
            <p>{NO_RESULTS_FOUND_TEXT}</p>
        }
    </div>;
};

export default UserDetails;