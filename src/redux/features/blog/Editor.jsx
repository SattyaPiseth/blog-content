import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill'; // Import Quill
import 'quill/dist/quill.snow.css'; // Import Quill's default styles

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    // Update refs for onTextChange and onSelectionChange
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    // Enable/disable editor based on readOnly prop
    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly); // Enable/disable based on readOnly prop
      }
    }, [readOnly, ref]);

    // Initialize the Quill editor
    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      // Assign Quill instance to forwarded ref
      ref.current = quill;

      // Set default value if provided
      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      // Handle text change
      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      // Handle selection change
      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      // Cleanup function to remove Quill instance
      return () => {
        if (ref.current) {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref]); // Dependency array ensures this runs only once

    return <div ref={containerRef} />;
  },
);

Editor.displayName = 'Editor';

export default Editor;
