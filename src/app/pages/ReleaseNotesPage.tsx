import React, { useEffect } from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { LatestReleases } from '../../docs';
import * as Colors from '@pxblue/colors';
import { ReleaseInfo } from '../../docs/release-notes';
import { CHANGE_PAGE_TITLE } from '../redux/actions';
import { useDispatch } from 'react-redux';

export const ReleaseNotesPage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: 'Release Notes' });
    }, [dispatch]);

    return (
        <>
            <div style={{ padding: 20, margin: '0 auto', maxWidth: 1024 }}>
                {LatestReleases.map((item: ReleaseInfo) => (
                    <div key={item.title} style={{ color: Colors.gray[500], textAlign: 'left' }}>
                        <div style={{ marginTop: theme.spacing(2), display: 'flex' }}>
                            <Typography variant={'h4'} color={'primary'}>
                                {item.title}
                            </Typography>
                        </div>
                        <Typography color={'inherit'}>{item.date}</Typography>
                        <Typography variant={'subtitle2'}>{`v${item.version}`}</Typography>
                        {item.details}
                    </div>
                ))}
            </div>
        </>
    );
};
