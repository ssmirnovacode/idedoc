import { useTypedSelector } from '../hooks/useTypedSelector';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
import { Fragment, useEffect } from 'react';
import './CellList.css';
import { useActions } from '../hooks/useActions';

const CellList = () => {
  const { fetchCells } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell?.id}>
        <AddCell nextCellId={cell?.id} />
        <CellListItem key={cell?.id} cell={cell} />
      </Fragment>
    );
  });
  return (
    <div className="cell-list">
      {renderedCells}
      <AddCell nextCellId="" />
    </div>
  );
};

export default CellList;
