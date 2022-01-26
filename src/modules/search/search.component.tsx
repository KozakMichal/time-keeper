import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { connect, DefaultRootState } from 'react-redux';
import { Dispatch } from 'redux';
import { changeSearchDebounced } from './actions';

interface StateProps {
}

interface SearchComponentProps {}

interface SearchComponentDispatchProps {
    changeSearchDebounced: (newSearch: string) => ReturnType<typeof changeSearchDebounced>,
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function SearchComponent( props: StateProps & SearchComponentDispatchProps & SearchComponentProps) {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                onChange={(event) => props.changeSearchDebounced(event.target.value)}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}


const mapStateToProps = (
    state: DefaultRootState
): StateProps => ({
    workspaces: state.workspaces?.workspaces || [],
});

const mapDispatchToProps = (dispatch: Dispatch): SearchComponentDispatchProps => ({
    changeSearchDebounced: (newSearch: string) => dispatch(changeSearchDebounced(newSearch)),
});

export default connect<StateProps, SearchComponentDispatchProps>(
    mapStateToProps, mapDispatchToProps
)(
    SearchComponent
);
