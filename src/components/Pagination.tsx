import {useEffect, useState} from 'react';
type Props = {
    totalItems: number;
    itemsPerPages: number;
    setNowPage: React.Dispatch<React.SetStateAction<number>> | undefined;
    nowPage: number;
};
const Pagination = (props: Props) => {
    const {totalItems, itemsPerPages, setNowPage, nowPage} = props;
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
            <button onClick={onClickPrev} disabled={nowPage == 1}>
                prev
            </button>
            {num &&
                num.map(n => (
                    <button key={n} style={n == nowPage ? {border: '1px solid red'} : {}} onClick={() => setNowPage && setNowPage(n)}>
                        {n}
                    </button>
                ))}
            <button onClick={onClickNext} disabled={nowPage == num.length}>
                next
            </button>
        </div>
    );
};
export default Pagination;
