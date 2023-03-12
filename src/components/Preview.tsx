import { useEffect, useRef } from "react";
import './Preview.css'
interface PreviewProps {
    code: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', event => {
            try {
              eval(event.data)
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime error: </h4>' + err + '</div>';
              console.error(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `

const Preview = (props: PreviewProps) => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = html;
        iframeRef?.current?.contentWindow.postMessage(props.code, '*');
    }, [props.code])

    return <div className="iframe-wrapper">
              <iframe 
              ref={iframeRef} 
              sandbox="allow-scripts" 
              title="preview-display" 
              srcDoc={html} />
            </div>
}

export default Preview