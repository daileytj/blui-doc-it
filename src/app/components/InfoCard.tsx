import React, { MouseEvent } from 'react';
import { Typography, useTheme, makeStyles, Theme, createStyles } from '@material-ui/core';

const getTopPaddingForAspectRatio = (ratio: AspectRatio | undefined): string => {
    switch (ratio) {
        case '1x1':
            return '100%';
        case '2x1':
            return '50%';
        case '3x2':
            return '66.67%';
        case '4x3':
            return '75%';
        case '16x9':
        default:
            return '56.25%';
    }
};
type AspectRatio = '16x9' | '4x3' | '3x2' | '2x1' | '1x1';
type InfoCardProps = {
    source: string | JSX.Element;
    onClick?: (event: MouseEvent) => void;
    aspectRatio?: AspectRatio;
    title: string;
    description: string;
    descriptionContent?: React.ReactNode;
    spacing: number;
    background?: {
        size?: string;
        position?: string;
        color?: string;
    };
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            marginBottom: theme.spacing(2),
            border: `1px solid ${theme.palette.divider}`,
            position: 'relative',
        },
        card: {
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
);

export const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { background = {} } = props;
    const theme = useTheme();
    const classes = useStyles();
    return (
        <div
            style={{
                cursor: props.onClick ? 'pointer' : 'default',
                margin: theme.spacing((-1 * props.spacing) / 2),
                padding: theme.spacing(props.spacing / 2),
            }}
            onClick={props.onClick}
            className={props.onClick ? classes.card : ''}
        >
            {typeof props.source === 'string' ? (
                <div
                    style={{
                        backgroundImage: `url(${props.source})`,
                        paddingTop: getTopPaddingForAspectRatio(props.aspectRatio),
                        backgroundPosition: background.position,
                        backgroundSize: background.size,
                    }}
                    className={classes.image}
                />
            ) : (
                <div style={{ paddingTop: getTopPaddingForAspectRatio(props.aspectRatio) }} className={classes.image}>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: background.color,
                        }}
                    >
                        {props.source}
                    </div>
                </div>
            )}
            <Typography variant={'h6'}>{props.title}</Typography>
            <Typography variant={'body2'} style={{ color: theme.palette.text.secondary, marginTop: theme.spacing(1) }}>
                {props.description}
            </Typography>
            <div>{props.descriptionContent}</div>
        </div>
    );
};
InfoCard.displayName = 'InfoCard';
InfoCard.defaultProps = {
    aspectRatio: '2x1',
};
