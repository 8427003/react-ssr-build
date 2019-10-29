import React, { useEffect } from 'react';

export default function (props) {
    console.log('entry page /xxxx ========================= start');
    console.log('page rules props: ', props);

    useEffect(() => {
        console.log('useEffect==================in /xxx')
        console.log('entry page /xxx ========================= end ');
    })
    return (
        <div>
            xxxxxxxxxxxxxxxx
        </div>
    )
}

