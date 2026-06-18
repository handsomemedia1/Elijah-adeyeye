import { useRef, useCallback } from 'react';
import {
  HiOutlinePhotograph, HiOutlineLink
} from 'react-icons/hi';
import './RichEditor.css';

/**
 * Lightweight WYSIWYG editor using contentEditable.
 * Write in plain text and use the toolbar for formatting.
 */
export default function RichEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  const exec = useCallback((command, val = null) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    // Sync content
    if (onChange) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const handleInput = () => {
    if (onChange) onChange(editorRef.current.innerHTML);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) exec('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      const alt = prompt('Enter a short description for SEO (Alt text):', 'Blog image');
      const imgHtml = `<img src="${url}" alt="${alt || 'Blog image'}" loading="lazy" />`;
      exec('insertHTML', imgHtml);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="rich-editor">
      {/* Toolbar */}
      <div className="rich-editor__toolbar">
        <div className="rich-editor__group">
          <button type="button" onClick={() => exec('formatBlock', 'h2')} title="Heading 2" className="rich-editor__btn">
            H2
          </button>
          <button type="button" onClick={() => exec('formatBlock', 'h3')} title="Heading 3" className="rich-editor__btn">
            H3
          </button>
          <button type="button" onClick={() => exec('formatBlock', 'p')} title="Paragraph" className="rich-editor__btn">
            P
          </button>
        </div>

        <div className="rich-editor__divider" />

        <div className="rich-editor__group">
          <button type="button" onClick={() => exec('bold')} title="Bold" className="rich-editor__btn">
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => exec('italic')} title="Italic" className="rich-editor__btn">
            <em>I</em>
          </button>
          <button type="button" onClick={() => exec('underline')} title="Underline" className="rich-editor__btn">
            <u>U</u>
          </button>
          <button type="button" onClick={() => exec('strikeThrough')} title="Strikethrough" className="rich-editor__btn">
            <s>S</s>
          </button>
        </div>

        <div className="rich-editor__divider" />

        <div className="rich-editor__group">
          <button type="button" onClick={() => exec('insertUnorderedList')} title="Bullet List" className="rich-editor__btn">
            • List
          </button>
          <button type="button" onClick={() => exec('insertOrderedList')} title="Numbered List" className="rich-editor__btn">
            1. List
          </button>
          <button type="button" onClick={() => exec('formatBlock', 'blockquote')} title="Quote" className="rich-editor__btn">
            " Quote
          </button>
        </div>

        <div className="rich-editor__divider" />

        <div className="rich-editor__group">
          <button type="button" onClick={insertLink} title="Insert Link" className="rich-editor__btn">
            <HiOutlineLink /> Link
          </button>
          <button type="button" onClick={insertImage} title="Insert Image" className="rich-editor__btn">
            <HiOutlinePhotograph /> Image
          </button>
        </div>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        className="rich-editor__content"
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: value || '' }}
        data-placeholder={placeholder || 'Start writing...'}
        suppressContentEditableWarning
      />
    </div>
  );
}
