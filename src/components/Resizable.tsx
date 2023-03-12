import { ResizableBox } from "react-resizable";
import './Resizable.css';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }

const Resizable = (props: ResizableProps) => {
    const { direction, children } = props;

    return (
        <ResizableBox 
            resizeHandles={['s']} // handle in the bottom of the box
            minConstraints={[Infinity, 24]} // limiting min size to 24px
            maxConstraints={[Infinity, window.innerHeight * 0.9]} // limiting resizing range (so it doesnt excape outside viewport)
            height={300} 
            width={Infinity}>
                {children}
        </ResizableBox>
    )

};

export default Resizable;