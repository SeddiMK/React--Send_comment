import './SearchHeader.scss';
import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

// store
import { RootState, useAppDispatch } from '../../store';

// import { searchInpHeader, setCurrentPage } from '../../store/filterSlice';

import {
  fetchAnimeSearchSlice,
  itemsAnimeSearch,
  searchInpHeader,
} from '../../store/searchSlice';

// type SearchProps = {
//   value: string,
// };

const SearchHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { id } = useParams();
  const [searchInpBtn, setSearchInpBtn] = useState(false);
  const [searchInpVal, setSearchInpVal] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null); // const inputRef = (useRef < HTMLInputElement) | (null > null);
  const formSearchRef = useRef<HTMLFormElement>(null);
  const [limitPar, setLimitPar] = useState(10);
  const [idAnime, setIdAnime] = useState('');

  const [valueSt, setValueSt] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [clickLinkAnime, setClickLinkAnime] = useState(true);

  const animeSearchItems = useSelector(itemsAnimeSearch);
  const searchInpValStore = useSelector(
    (state: RootState) => state.searchSlice.searchInpVal
  );

  // кнопка очистки
  // const onClickClear = () => {
  //   setSearchValue('');
  //   setSearchInpVal('');
  // };

  // updateInpSearchValue --// сохраняет ссылку при перерендере----------------
  const updateInpSearchValue = useCallback(
    debounce((inp: string) => {
      setSearchValue(inp);
      dispatch(searchInpHeader(inp));
    }, 350),
    []
  );
  // fthAnimeSearchSlice -----------------------------
  const fthAnimeSearchSlice = () => {
    dispatch(fetchAnimeSearchSlice({ searchInpVal, limitPar, idAnime }));
    document.getElementById('root')?.scrollIntoView(); // при перерисовке скорит на верх стр
  };
  // const handlerSearchBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   // отправить данные в store для поиска
  //   dispatch(searchInpHeader(searchValue));
  // };.length === 0
  // console.log(id);
  // console.log(Boolean(id));

  // onChangeInput ----e: React.ChangeEvent<HTMLInputElement>------------------
  const onChangeInput = () => {
    if (inputRef.current) {
      updateInpSearchValue(inputRef.current.value);
      setSearchInpVal(inputRef.current.value);
    }
    // if (id && inputRef.current) navigate('/');

    // dispatch(setCurrentPage(1));
  };

  // close in window ----------------------------
  const handleClick = (e) => {
    if (inputRef.current && !formSearchRef.current?.contains(e.target)) {
      setSearchInpBtn(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
  // ----------------------------------------------
  useEffect(() => {
    if (searchInpVal === '') {
      setSearchInpVal(searchInpVal);
    } else if (inputRef.current) {
      updateInpSearchValue(inputRef.current.value);
      setSearchInpVal(inputRef.current.value);
    }
  }, [searchInpVal, searchInpValStore, updateInpSearchValue]);

  useEffect(() => {
    if (searchInpVal !== '') {
      fthAnimeSearchSlice();
      setClickLinkAnime(true);
    }
    // else if (inputRef.current) {
    //   updateInpSearchValue(inputRef.current.value);
    //   setSearchInpVal(inputRef.current.value);
    // }
  }, [searchInpVal]);

  // if (searchInpValStore && animeItems.length === 0) {
  //   return <p> Ничего не нашли... &#128524; Пожалуйста измените запрос.</p>;
  // }

  // console.log(searchInpBtn, 'searchInpBtn');
  console.log(animeSearchItems, 'animeSearchItems-----');
  // console.log(!searchInpVal, '!searchInpVal');

  return (
    <form
      className="search-header__form"
      ref={formSearchRef}
      id="navbar-search">
      <button
        onClick={() => setSearchInpBtn(!searchInpBtn)}
        type="button"
        id="search-header-btn"
        className="menu__btn search-header material-symbols-outlined">
        {searchInpBtn ? 'close' : 'search'}
      </button>
      {searchInpBtn && (
        <div className="search-header__search">
          <div className="search-header__search-inp">
            <input
              value={searchInpVal}
              onChange={() => onChangeInput()}
              ref={inputRef}
              className="search-header__inp form-control-reset"
              name="search-header"
              type="search"
              placeholder="Поиск аниме, манги, людей и персонажей"
            />
          </div>
          {/* searchInpVal && animeSearchItems.length !== 0 */}
          {clickLinkAnime && true && (
            <div className="search-header__popup-result">
              <div className="item-search__title-type">
                <h3>Аниме</h3>
              </div>
              <ul className="search-header__list">
                {/* animeSearchItems.length !== 0 && */}
                {animeSearchItems?.map((elem, ind) => (
                  <li className="search-header__item item-search">
                    <Link
                      key={elem.id + ind}
                      id="search-link"
                      className="item-search__link"
                      onClick={() => setClickLinkAnime(false)}
                      to={`/fullDescItem/${elem.id}`}>
                      <div className="item-search__img-wrap wrap-img-search">
                        <img
                          src={
                            elem.material_data?.poster_url
                              ? elem.material_data?.poster_url
                              : elem.screenshots[0]
                          }
                          alt={'изображение аниме ' + elem.title}
                          className="item-search__image img"
                        />
                      </div>
                      <div className="item-search__title-year">
                        <div className="item-search__title">
                          <h2>
                            {elem.title} <br /> {elem.title_orig}
                          </h2>
                        </div>
                        <div className="item-search__year-kind">
                          {elem.year} /{' '}
                          {elem.material_data?.anime_kind
                            ? elem.material_data?.anime_kind
                            : elem.type}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchHeader;