import './style.scss';
import { useState, useEffect } from 'react';
import instance from '@/api/instance/defaultInstance';
import { BASE_URL } from '@/api/constants/url';
import { Category, Spaces } from '@/api/types/activities';
import SpaceCardList from './components/SpaceCardList';
import Pagination from '@/components/Pagination';
import useDeviceType from '@/hooks/useDeviceType/useDeviceType';
import SearchBar from './components/SearchBar';
import { FormEvent, MouseEvent, ChangeEvent } from 'react';
import { DropDownValue } from '@/components/Dropdown';
import Banner from './components/Banner';
import HotSpaceCardList from './components/HotSpaceCardList';

interface DataType {
  activities: Spaces[];
  totalCount: number;
}

const calculateLimit = (deviceType: string | undefined) => {
  if (!deviceType) return;
  switch (deviceType) {
    case 'pc':
      return 8;
    case 'tablet':
      return 9;
    default:
      return 6;
  }
};

export default function MainPage() {
  const deviceType = useDeviceType();
  const [data, setData] = useState<DataType | null>(null);
  const [size, setSize] = useState(calculateLimit(deviceType));
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>('');
  const [sortedSpaces, setSortedSpaces] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(''); // 검색한 결과

  const handleClickCategory = (name: Category) => {
    setSelectedCategory((prev) => (prev === name ? '' : name));
    setPage(1);
  };

  const handleSortSpaces = (value: DropDownValue) => {
    if (value === '') {
      return;
    } else if (value === 'high') {
      setSortedSpaces('price_desc');
    } else if (value === 'row') {
      setSortedSpaces('price_asc');
    }
  };

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>,
    text?: string,
  ) => {
    e.preventDefault();

    if (text !== undefined) {
      setSearchValue(text);
      setSearchResult(text);
    } else {
      setSearchResult(searchValue);
    }
    setSelectedCategory('');
    setSortedSpaces('latest');
  };

  useEffect(() => {
    const getSpaces = async () => {
      try {
        let url = `${BASE_URL}activities?method=offset&page=${page}&size=${size}`;
        // selectedCategory가 빈 문자열이 아닌 경우에만 카테고리 쿼리 파라미터를 추가
        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }
        if (sortedSpaces) {
          url += `&sort=${sortedSpaces}`;
        }
        if (searchValue) {
          url += `&keyword=${searchResult}`;
        }

        const res = await instance.get(url);
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getSpaces();
  }, [page, selectedCategory, sortedSpaces, size, searchResult]);

  useEffect(() => {
    setPage(1);
    setSize(calculateLimit(deviceType));
  }, [deviceType]);

  return (
    <div className="main-container">
      <Banner />
      <SearchBar
        searchValue={searchValue}
        handleSearchText={handleSearchText}
        handleSearchSubmit={handleSearchSubmit}
      />
      {!searchResult && <HotSpaceCardList />}
      {data?.activities && (
        <SpaceCardList
          searchResult={searchResult}
          spaces={data.activities}
          handleClickCategory={handleClickCategory}
          handleSortSpaces={handleSortSpaces}
        />
      )}
      <div className="main-pagination-wrapper">
        <Pagination totalCount={data?.totalCount} size={size as number} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
