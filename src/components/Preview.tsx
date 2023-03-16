import { useEffect, useRef } from "react";
import './Preview.css'
interface PreviewProps {
    code: string;
    err: string;
}

const html = `
    <html>
      <head>
        <style> html { background-color: white }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = err => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime error: </h4>' + err + '</div>';
            console.error(err);
          };
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event?.error);
          }); 
          window.addEventListener('message', event => {
            try {
              eval(event.data)
            } catch (err) {
              handleError(err);
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
        // Making sure the message gets sent with new data, not previous:
        setTimeout(() => {
          iframeRef?.current?.contentWindow.postMessage(props.code, '*');
        }, 50)

    }, [props.code])

    return <div className="preview-wrapper">
              <iframe 
              ref={iframeRef} 
              sandbox="allow-scripts" 
              title="preview-display" 
              srcDoc={html} />
            
      { props.err && <div className="preview-error">{props.err}</div>}
    </div>
}

export default Preview