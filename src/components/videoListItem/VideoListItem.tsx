import './VideoListItem.scss';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// import srcImg from '../../assets/image/anime-poster/659f8dd485857721242765.jpg';

import FormMain from '../formMain/FormMain';
import RatingStar from '../rating/RatingStar';
import Skeleton from '../../containers/sceleton/Skeleton';
import Error from '../../pages/error/Error';

// store
import { RootState, useAppDispatch } from '../../store';
import {
  AnimeItems,
  fetchAnimeListSlice,
  itemsAnime,
} from '../../store/animeSlice';
import {
  AnimeSearch,
  fetchAnimeSearchSlice,
  itemsAnimeSearch,
  setIdFullDesc,
  setItemsSearch,
} from '../../store/searchSlice';

import { useSelector } from 'react-redux';
import VideoListPage from './VideoListItem';

// ---------------------------------------------------------------------

const VideoListItem: React.FC = () => {
  const dispatch = useAppDispatch();

  const isMount = useRef(false); // флаг первого рендера
  const skeletons = [...new Array(10)].map((_, i) => <Skeleton key={i} />); //!!!!!!!!!!!!!!!!!!!

  let { status } = useSelector((state: RootState) => state.animeSlice);
  // search param ----------------------------------------------
  // const [titlePar, setTitlePar] = useState('');
  const [limitPar, setLimitPar] = useState(100);

  const [itemsAnimeSlice, setItemsAnimeSlice] = useState<AnimeItems[]>([]);

  const animeSearchItems = useSelector(itemsAnimeSearch);

  // console.log(animeSearchItems, '+++++++++++++++++++animeSearchItems');

  const animeItems = useSelector(itemsAnime);

  // запрос fetch в redux
  const fthAnimeSlice = () => {
    dispatch(
      fetchAnimeListSlice({
        limitPar,
      })
    );
    document.getElementById('root')?.scrollIntoView(); // при перерисовке скорит на верх стр
  };

  //--------------------------------------------------------------

  let aliImgMediaLeft = 'постер аниме поднятс главным героем'; // данные из бекенда ------------

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  //если был первый рендер, то запрашиваем данные
  useEffect(() => {
    console.log(!isMount.current, '!isMount.current');
    if (!isMount.current) {
      console.log('fetchAnimeSlice()');
      fthAnimeSlice();
      // dispatch(setItemsSearch([]));
    }
    isMount.current = true;
  }, [isMount]);

  useEffect(() => {
    // console.log(animeSearchItems, 'animeSearchItems');
    fthAnimeSlice();
    if (animeItems.length === 0) {
    }
  }, []);

  // fthAnimeSearchSlice -------------------------------------------------
  // useEffect(() => {
  //   // console.log(animeSearchItems, 'animeSearchItems');

  //   if (searchInpValStore) {
  //     console.log(
  //       searchInpValStore,
  //       'searchInpValStore in useEffect---------0000000000000000000000'
  //     ); // && animeSearchItems.length === 0
  //     // setTitlePar(searchInpValStore);
  //     fthAnimeSearchSlice();
  //   }
  // }, [searchInpValStore]);

  // useEffect(() => {
  //   // console.log(animeSearchItems, 'animeSearchItems');

  //   if (searchInpValStore) {
  //     console.log(
  //       searchInpValStore,
  //       'searchInpValStore in useEffect---------1111111111111111111111111'
  //     ); // && animeSearchItems.length === 0
  //     // setTitlePar(searchInpValStore);
  //     setItemsAnimeSlice(animeSearchItems);
  //   }
  // }, [searchInpValStore]);

  // fthAnimeSlice -------------------------------------------------
  // useEffect(() => {
  //   console.log(animeItems, 'animeItems шт useEffect');

  //   if (itemsAnimeSlice.length === 0) {
  //     console.log('setItemsAnimeSlice(animeItems);');

  //     // fthAnimeSlice();
  //     setItemsAnimeSlice(animeItems);
  //   }

  //   // if (searchInpValStore && animeSearchItems.length === 0) {
  //   //   console.log('setItemsAnimeSlice(animeItems)');

  //   //   fthAnimeSearchSlice();
  //   //   setItemsAnimeSlice(animeSearchItems);
  //   // }
  // }, [animeItems]);

  console.log(animeItems, 'animeItems');
  // console.log(animeSearchItems, 'animeSearchItems');
  // console.log(itemsAnimeSlice, '------itemsAnimeSlice-------');

  return (
    <>
      {status === 'error' ? (
        <Error />
      ) : (
        <>
          {status === 'loading' || animeItems.length === 0 ? (
            <p className="loading-anime-page">Загрузка...</p>
          ) : (
            animeItems?.map((elem, ind) => (
              <div key={elem.id + ind} className="anime__item item-anime">
                <Link
                  className="item-anime__link-full-desc"
                  to={`/fullDescItem/${elem.id}`}
                  onClick={() => dispatch(setIdFullDesc(elem.id))}>
                  <div className="item-anime__img-wrap wrap-img-anime">
                    <img
                      src={
                        elem.material_data?.poster_url
                          ? elem.material_data?.poster_url
                          : elem.screenshots[0]
                      }
                      alt={'изображение аниме ' + elem.title}
                      className="item-anime__image img"
                    />

                    <div className="item-anime__title">{elem.title}</div>
                    <div className="item-anime__rating">
                      <span className="item-anime__star">&#9733;</span>
                      <span className="item-anime__num">
                        {elem.material_data?.shikimori_rating}
                      </span>

                      <span className="item-anime__votes">
                        {' / '}
                        {elem.material_data?.shikimori_votes}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
};

export default VideoListItem;