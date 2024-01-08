import {useEffect, useState} from 'react';
import '../App.css';
type Props = {
    totalItems: number;
    itemsPerPages: number;
    setNowPage?: React.Dispatch<React.SetStateAction<number>> | undefined;
    nowPage: number;
    pageNumberTestId?: string;
};
const Pagination = (props: Props) => {
    const {totalItems, itemsPerPages, setNowPage, nowPage, pageNumberTestId} = props;
    const [num, setNum] = useState<number[]>([]);
    useEffect(() => {
        if (totalItems > 0 && itemsPerPages > 0) {
            const pages = Math.ceil(totalItems / itemsPerPages);
            setNum(Array.from(Array(pages + 1).keys()).slice(1));
        }
    }, [totalItems, itemsPerPages]);
    const onClickPrev = () => {
        setNowPage && setNowPage(nowPage - 1);
    };

    const onClickNext = () => {
        setNowPage && setNowPage(nowPage + 1);
    };

    return (
        <div>
            <button onClick={onClickPrev} className={nowPage === 1 ? 'disabledBtn' : ''}>
                prev
            </button>
            {num &&
                num.map(n => (
                    <button key={n} style={n == nowPage ? {border: '2px solid blue'} : {}} onClick={() => setNowPage && setNowPage(n)} data-testid={pageNumberTestId}>
                        {n}
                    </button>
                ))}
            <button onClick={onClickNext} className={nowPage === num.length ? 'disabledBtn' : ''}>
                next
            </button>
        </div>
    );
};
export default Pagination;
