import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill'; // Ensure Quill is imported

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    // Update the refs on prop changes
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    // Enable/disable editor based on readOnly prop
    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly); // Enable or disable Quill based on readOnly
      }
    }, [ref, readOnly]);

    // Set up Quill editor on mount and clean up on unmount
    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      // Assign the Quill instance to ref
      ref.current = quill;

      // Set initial content if provided
      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      // Add event listeners for text change and selection change
      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      // Cleanup on unmount
      return () => {
        ref.current = null;
        container.innerHTML = ''; // Clean up the Quill instance
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = 'Editor';

export default Editor;
