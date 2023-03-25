import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './Resizable.css';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }

const Resizable = (props: ResizableProps) => {
    const { direction, children } = props;

    const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);
    const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
    const [ width, setWidth ] = useState(window.innerWidth * 0.75)

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) clearTimeout(timer); 
            timer = setTimeout(() => { // debouncing
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75)
                }
            }, 100)
            
        }
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])

    const getResizableProps = (): ResizableBoxProps => {
        if (direction === 'vertical') {
            return {
                resizeHandles: ['s'],
                minConstraints: [Infinity, 24],
                maxConstraints:[Infinity, innerHeight * 0.9], 
                height: 300 ,
                width: Infinity
            }
        }
        else return {
            className: 'resize-horizontal',
            resizeHandles: ['e'],
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints:[innerWidth * 0.75, Infinity], 
            height: Infinity,
            width,
            // to avoid the code editor window jump back to original size after resizing:
            onResizeStop: (event, data) => {
                setWidth(data.size.width)
            }
        }
    }

    return (
        <ResizableBox {...getResizableProps()}>
                {children}
        </ResizableBox>
    )

};

export default Resizable;