import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './Resizable.css';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }

const Resizable = (props: ResizableProps) => {
    const { direction, children } = props;
    const getResizableProps = (): ResizableBoxProps => {
        if (direction === 'vertical') {
            return {
                resizeHandles: ['s'],
                minConstraints: [Infinity, 24],
                maxConstraints:[Infinity, window.innerHeight * 0.9], 
                height: 300 ,
                width: Infinity
            }
        }
        else return {
            className: 'resize-horizontal',
            resizeHandles: ['e'],
            minConstraints: [window.innerWidth * 0.2, Infinity],
            maxConstraints:[window.innerWidth * 0.75, Infinity], 
            height: Infinity,
            width: window.innerWidth * 0.75
        }
    }

    return (
        <ResizableBox {...getResizableProps()}>
                {children}
        </ResizableBox>
    )

};

export default Resizable;