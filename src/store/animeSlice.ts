import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { Axios } from 'axios'
import { RootState } from '.'
// kodik---------------------------------------------------------------------
import { kodikApiKey } from '../kodikcfg'
// import { Client, MaterialObject, VideoLinks } from 'kodikwrapper';

export type AnimeParams = {
	limitPar: number
	yearNew: string | number
}

export type AnimeItems = {
	length: number
	id: string
	imdb_id: string
	kinopoisk_id: string
	shikimori_id: string
	link: string

	material_data: {
		imdb_rating: number
		imdb_votes: number
		kinopoisk_rating: number
		kinopoisk_votes: number
		shikimori_rating: number
		shikimori_votes: number

		anime_license_name: string
		actors: string[]
		all_genres: string
		anime_status: string
		anime_studios: string[]
		anime_title: string
		description: string
		duration: 24
		episodes_aired: 7
		episodes_total: 11
		minimal_age: 16
		anime_kind: string
		title: string
		title_en: string
		screenshots: string[]
		poster_url: string
		year: number
		aired_at: string
		all_status: string
		anime_description: string
		anime_genres: string[]
		next_episode_at: string
		other_titles: string[]
		other_titles_en: string[]
		other_titles_jp: string[]
		rating_mpaa: string
	}

	other_title: string
	quality: string
	screenshots: [string]
	title: string
	title_orig: string
	translation: {
		id: number
		title: string
		type: string
	}
	type: string
	updated_at: string
	worldart_link: string
	year: number
}

export const fetchAnimeListSlice = createAsyncThunk<AnimeItems[], AnimeParams>(
	'anime/fetchAnimeStatus',
	async params => {
		try {
			const { limitPar, yearNew } = params

			// https://cors-anywhere.herokuapp.com/   https://cors-anywhere-d58jih5xd-maxs-projects-4db4b9f2.vercel.app/
			const resp: any = await axios.get<AnimeItems[]>(
				`http://kodikapi.com/list?limit=${limitPar}&type='anime-serial'${yearNew}&with_material_data=true&token=${kodikApiKey}`
			)

			if (resp.status !== 200) {
				throw new Error('Server Error!')
			}
			const data = resp.data.results
			// console.log(resp);
			// console.log(data, '------------data list------------');

			// let animesItems: MaterialObject[] = [];
			let titles: string[] = []
			let origTitles: string[] = []
			let animesItems: AnimeItems[] = []
			let animesItemsNotTest: AnimeItems[] = []
			// let animesItemsSearchAll: AnimeSearch[] = [];
			let prevTitle: string | null = null
			let prevId: string | null = null

			// filter uniq

			// const seen = new Set();
			// const uniqueObjects = objects.filter(obj => {
			//     if (seen.has(obj.title)) {
			//         return false;
			//     } else {
			//         seen.add(obj.title);
			//         return true;
			//     }
			// });
			// ----------------------------------------------------------------
			if (data.length !== 0) {
				// let prevTitle: string | null = material[0].title; // && item.title.toLowerCase() !==
				for (const item of data) {
					if (
						(item.type === 'anime' || item.type === 'anime-serial') &&
						item.title.toLowerCase() !== prevTitle
					) {
						animesItems.push(item)
					} else {
						animesItemsNotTest.push(item)
					}

					prevTitle = item.other_title
					prevId = item.id
				}
			} else {
				console.log('нет данных для показа')
			}
			// ----------- client kodik ----------------------------------------------------
			// const [animesItemsSearch, setAnimesItemsSearch] = useState<any>([]);

			// let titles: string[] = [];
			// let origTitles: string[] = [];

			// await clientKodik
			//   .search({ limit: limitPar, title: titlePar })
			//   .then((response) => response.results)
			//   .then(async (material) => {
			//     if (material) return new Error('не найдено. нет данных.');

			//     console.log(material, '---------materia----search--in_slice');
			//     animesItemsSearchAll = material;
			//     // setAnimeData(material); MaterialObject[]

			//     // type
			//     const related: MaterialObject[] = [];
			//     const title: string[] = [];
			//     const origTitle: string[] = [];
			//     let prevTitle: string | null = null;

			//     if (material.length !== 0) {
			//       // let prevTitle: string | null = material[0].title;
			//       for (const item of material) {
			//         if (
			//           (item.type === 'anime' || item.type === 'anime-serial') &&
			//           item.title_orig.toLowerCase() !== prevTitle
			//         ) {
			//           animesItemsSearch.push(item);
			//         } else {
			//           console.log('не данных для показа');
			//           // navigate('/error', { replace: true });
			//         }

			//         if (item.type === 'anime' || item.type === 'anime-serial') {
			//           title.push(item.title);
			//           origTitle.push(item.title_orig);
			//         }

			//         prevTitle = item.title_orig.toLowerCase();
			//       }
			//     }

			//     titles = [...new Set(title)];
			//     origTitles = [...new Set(origTitle)];

			console.log()
			// -----------------------------------------------------------------------------
			//     // countries(params?: CountriesParams): Promise<CountriesResponse>;
			//     // genres(params?: GenresParams): Promise<GenresResponse>;
			//     // list(params?: ListParams): Promise<ListResponse>;
			//     // qualities(params?: QualitiesParams): Promise<QualitiesResponse>;
			//     // qualitiesV2(params?: QualitiesV2Params): Promise<QualitiesV2Response>;
			//     // search(params?: SearchParams): Promise<SearchResponse>;
			//     // translations(params?: TranslationsParams): Promise<TranslationsResponse>;
			//     // translationsV2(params?: TranslationsV2Params): Promise<TranslationsV2Response>;
			//     // years(params?:

			//     // [animesItemsSearchAll, animesItemsSearch]
			//   });
			// ------------------------------------------------------------------

			let uniqueAnimesItems = Object.values(
				animesItems.reduce((acc, obj) => {
					acc[obj.title] = obj
					return acc
				}, {})
			)
			if (uniqueAnimesItems.length / 3 !== 0) {
				uniqueAnimesItems.pop()
			}

			return uniqueAnimesItems //animesItems as AnimeItems[];
		} catch (error) {
			return error.message //rejectWithValue(
		}
	}
)

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface AnimeSliceState {
	itemsList: AnimeItems[]

	status: Status
	error: string | unknown
	loading: boolean
}

const initialState: AnimeSliceState = {
	itemsList: [],

	status: Status.LOADING, // loading | success | error
	error: '',
	loading: true,
}

// -----------------------------------store
const animeSlice = createSlice({
	name: 'anime',
	initialState,
	reducers: {
		// setItems: (state, action: PayloadAction<[]>) => {
		//   state.itemsList = action.payload;
		// },
	},

	extraReducers: builder => {
		builder.addCase(fetchAnimeListSlice.pending, state => {
			state.status = Status.LOADING
			state.loading = true
			state.itemsList = []
		})
		builder.addCase(fetchAnimeListSlice.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.itemsList = action.payload
			state.loading = false

			// if (state.itemsList.length > 1) {
			//   // setItemsReindexing -----------------------------------
			//   state.itemsList.reduce<{}>((accum: any, item: any) => {
			//     accum[item.articul] = item;
			//     return (state.itemsReindexing = accum);
			//   }, {});
			// }
		})

		builder.addCase(fetchAnimeListSlice.rejected, (state, action) => {
			state.status = Status.ERROR
			state.error = action.payload
			state.itemsList = []
			state.loading = false
		})
	},
})

export const itemsAnime = (state: RootState) => state.animeSlice.itemsList

export default animeSlice.reducer
