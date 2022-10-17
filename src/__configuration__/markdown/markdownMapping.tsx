/* eslint-disable react/display-name */
import React, { HTMLAttributes, useState } from 'react';
import {
    Typography,
    TypographyProps,
    SvgIconProps,
    Snackbar,
    makeStyles,
    Theme,
    createStyles,
    useTheme,
    IconButton,
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import { Link, LinkProps } from 'react-router-dom';
import { REGULAR_WIDTH_STYLE, copyTextToClipboard, getHash } from '../../app/shared';
import * as Colors from '@brightlayer-ui/colors';
import color from 'color';
import clsx from 'clsx';
import './markdown.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        snackBarRoot: {
            [theme.breakpoints.down('xs')]: {
                bottom: theme.spacing(12),
            },
        },
        links: {
            fontWeight: 400,
            textDecorationColor: color(
                theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.primary.dark
            )
                .fade(0.5)
                .toString(),
            color: theme.palette.primary.main,
        },
    })
);

export const ExternalLink = (tProps: TypographyProps<'a'>): JSX.Element => {
    const classes = useStyles();
    return (
        <Typography
            component={'a'}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={classes.links}
            {...tProps}
        />
    );
};

export const InternalLink = (props: LinkProps): JSX.Element => {
    const classes = useStyles();
    return <Link rel={'noopener noreferrer'} className={classes.links} {...props} />;
};

type Headline = HTMLAttributes<HTMLDivElement> & {
    hash: string;
    TypographyProps: TypographyProps;
    SvgIconProps?: SvgIconProps;
};

const Headline: React.FC<Headline> = ({
    hash,
    className,
    TypographyProps: otherTypographyProps,
    SvgIconProps: otherSvgIconProps,
    ...otherDivProps
}) => {
    const [onCopy, setOnCopy] = useState(false);
    const classes = useStyles();
    return (
        <div
            className={clsx(className, 'headline')}
            {...otherDivProps}
            style={{ ...REGULAR_WIDTH_STYLE, ...otherDivProps.style }}
        >
            <span id={hash} style={{ position: 'relative', top: -90 }} />
            <Typography
                paragraph
                color={'primary'}
                component={'span'}
                {...otherTypographyProps}
                className={'headline-text'}
                style={{ hyphens: 'auto', ...otherTypographyProps.style }}
            >
                {otherTypographyProps.children}
                <IconButton
                    onClick={(): void => {
                        copyTextToClipboard(`${window.location.origin}${window.location.pathname}#${hash}`);
                        setOnCopy(true);
                    }}
                    style={{ marginLeft: 8 }}
                    size={'small'}
                    color={'primary'}
                >
                    <LinkIcon titleAccess={'copy to clipboard'} {...otherSvgIconProps} />
                </IconButton>
            </Typography>
            {onCopy && (
                <Snackbar
                    open={onCopy}
                    classes={{ root: classes.snackBarRoot }}
                    autoHideDuration={3000}
                    resumeHideDuration={1000}
                    onClose={(): void => setOnCopy(false)}
                    message={'Link copied to clipboard.'}
                />
            )}
        </div>
    );
};

export const componentsMap = {
    h1: (props: TypographyProps): JSX.Element => (
        <Headline
            className={'markdownH1'}
            style={{ marginBottom: 32, hyphens: 'auto' }}
            hash={getHash(props.children?.toString() || 'h1')}
            TypographyProps={{ variant: 'h4', ...props }}
        />
    ),
    h2: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 64, marginBottom: 16 }}
            hash={getHash(props.children?.toString() || 'h2')}
            TypographyProps={{ variant: 'h6', ...props }}
        />
    ),
    h3: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 32, marginBottom: 16 }}
            hash={getHash(props.children?.toString() || 'h3')}
            TypographyProps={{ variant: 'body1', style: { fontWeight: 600 }, ...props }}
        />
    ),
    h4: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 16 }}
            hash={getHash(props.children?.toString() || 'h4')}
            TypographyProps={{ variant: 'subtitle1', ...props }}
        />
    ),
    h5: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 8 }}
            hash={getHash(props.children?.toString() || 'h5')}
            TypographyProps={{ variant: 'body2', ...props }}
        />
    ),
    h6: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 8, fontSize: '0.75rem' }}
            hash={getHash(props.children?.toString() || 'h6')}
            TypographyProps={{ variant: 'body2', ...props }}
        />
    ),
    a: (props: TypographyProps<'a'> | LinkProps): JSX.Element => {
        let tProps;
        if (props.href && (props.href.match(/^http/gi) || props.href.match(/^mailto/gi))) {
            tProps = props as TypographyProps<'a'>;
            return <ExternalLink {...tProps} />;
        }
        tProps = props as LinkProps;
        // @ts-ignore
        return <InternalLink to={props.href} {...tProps} />;
    },
    p: (props: TypographyProps): JSX.Element => <Typography style={{ ...REGULAR_WIDTH_STYLE }} paragraph {...props} />,
    li: (props: TypographyProps<'li'>): JSX.Element => (
        <Typography component={'li'} className={'mdLi'} style={{ ...REGULAR_WIDTH_STYLE }} {...props} />
    ),
    blockquote: (props: TypographyProps<'blockquote'>): JSX.Element => {
        const theme = useTheme();
        return (
            <Typography
                component={'blockquote'}
                style={{
                    paddingRight: 16,
                    marginBottom: 8,
                    backgroundColor: color(theme.palette.primary.main).fade(0.9).string(),
                    borderLeftColor: theme.palette.primary.main,
                    ...REGULAR_WIDTH_STYLE,
                }}
                {...props}
            />
        );
    },
    pre: (props: TypographyProps<'pre'>): JSX.Element => {
        const theme = useTheme();
        return (
            <Typography
                component={'pre'}
                color={'textPrimary'}
                style={{
                    paddingRight: 16,
                    marginBottom: 8,
                    display: 'flex',
                    backgroundColor:
                        theme.palette.type === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                    ...REGULAR_WIDTH_STYLE,
                }}
                {...props}
            />
        );
    },
    code: (props: TypographyProps<'code'>): JSX.Element => {
        const theme = useTheme();
        return (
            <Typography
                component={'code'}
                color={'textPrimary'}
                style={{
                    backgroundColor:
                        theme.palette.type === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                    fontFamily: 'Roboto Mono, Monospaced',
                    fontSize: 12,
                }}
                {...props}
            />
        );
    },
    inlineCode: (props: TypographyProps<'code'>): JSX.Element => {
        const theme = useTheme();
        return (
            <Typography
                component={'code'}
                color={'textPrimary'}
                style={{
                    backgroundColor:
                        theme.palette.type === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                    fontFamily: 'Roboto Mono, Monospaced',
                    border: theme.palette.type === 'light' ? undefined : `${theme.palette.divider} 1px solid`,
                }}
                {...props}
            />
        );
    },
};
