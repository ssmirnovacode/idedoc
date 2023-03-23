import { useTypedSelector } from "./useTypedSelector";


export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector(state => {
        const { data, order } = state.cells;
        const orderedCells = order.map(id => data[id]);
    
        const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
          var show = (value) => {
            const root = document.querySelector("#root");
            if (typeof value === 'object') {
              if (value.$$typeof && value.props) {
                _ReactDOM.render(value, root);
              }
              else root.innerHTML = JSON.stringify(value);
            }
            else root.innerHTML = value;
          };
        `
        const showFuncNoop = 'var show = () => {}'; // to be executed in Preview of following empty code cells
    
        const cumulativeCode = [];
        for (let c of orderedCells) {
          if(c.type === 'code') {
            c.id === cellId ?  cumulativeCode.push(showFunc) : cumulativeCode.push(showFuncNoop)
            cumulativeCode.push(c.content)
          }
          if (c.id === cellId) { // making sure only previous code cells are taken into account
            break
          }
        }
        return cumulativeCode;
      }).join('\n')
}