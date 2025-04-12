import React, { useState, useEffect, useCallback } from 'react';
import { 
  useEditor, 
  EditorContent 
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import './NoteEditor.css';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  simpleMode?: boolean; // 간단한 모드 여부 (슬래시 명령어 없이)
}

/**
 * 노션 스타일의 리치 텍스트 에디터 컴포넌트
 * 
 * @param content 초기 HTML 콘텐츠
 * @param onChange 콘텐츠 변경 시 호출될 함수
 * @param placeholder 빈 에디터에 표시될 안내 메시지
 * @param simpleMode true면 슬래시 명령어 기능이 비활성화됨
 */
const NoteEditor: React.FC<EditorProps> = ({ 
  content, 
  onChange,
  placeholder = '텍스트를 입력하거나 명령어를 사용하세요...',
  simpleMode = false
}) => {
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  const [slashCommandFilter, setSlashCommandFilter] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });
  
  // 슬래시 명령어 및 ESC로 명령어 창 닫기 이벤트 리스너
  useEffect(() => {
    if (simpleMode) return; // 간단한 모드에서는 이벤트 리스너를 설정하지 않음
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && editor?.isFocused) {
        setShowSlashCommands(true);
        setSlashCommandFilter('');
      } else if (e.key === 'Escape') {
        setShowSlashCommands(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, simpleMode]);

  // 외부에서 content prop이 변경되었을 때 에디터 콘텐츠 업데이트
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // 슬래시 명령어 처리
  const handleSlashCommandSelect = useCallback((command: string) => {
    if (!editor) return;
    
    switch (command) {
      case 'heading1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'heading2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'taskList':
        editor.chain().focus().toggleTaskList().run();
        break;
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'codeBlock':
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case 'image':
        const url = window.prompt('이미지 URL 입력:');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        break;
      case 'horizontalRule':
        editor.chain().focus().setHorizontalRule().run();
        break;
    }
    
    setShowSlashCommands(false);
  }, [editor]);

  // 사용 가능한 슬래시 명령어 목록
  const slashCommands = [
    { name: 'heading1', label: '제목 1', icon: 'H1' },
    { name: 'heading2', label: '제목 2', icon: 'H2' },
    { name: 'bulletList', label: '글머리 기호 목록', icon: '•' },
    { name: 'orderedList', label: '번호 매기기 목록', icon: '1.' },
    { name: 'taskList', label: '할 일 목록', icon: '☑' },
    { name: 'blockquote', label: '인용구', icon: '"' },
    { name: 'codeBlock', label: '코드 블록', icon: '</>' },
    { name: 'image', label: '이미지', icon: '🖼️' },
    { name: 'horizontalRule', label: '수평선', icon: '—' },
  ];

  // 검색어로 명령어 필터링
  const filteredCommands = slashCommands.filter(
    command => 
      command.label.toLowerCase().includes(slashCommandFilter.toLowerCase()) ||
      command.name.toLowerCase().includes(slashCommandFilter.toLowerCase())
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="note-editor relative">
      <div className="editor-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <span className="icon">B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <span className="icon">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <span className="icon">S</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <span className="icon">"</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <span className="icon">{'</>'}</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <span className="icon">•</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <span className="icon">1.</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()}>
          <span className="icon">☑</span>
        </button>
        <button
          onClick={() => {
            const url = window.prompt('이미지 URL 입력:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <span className="icon">🖼️</span>
        </button>
        {!simpleMode && (
          <button
            onClick={() => setShowSlashCommands(true)}
          >
            <span className="icon">/</span>
          </button>
        )}
      </div>

      <EditorContent editor={editor} />

      {!simpleMode && showSlashCommands && (
        <div className="slash-commands-menu">
          <div className="slash-commands-header">
            <input 
              type="text"
              value={slashCommandFilter}
              onChange={(e) => setSlashCommandFilter(e.target.value)}
              placeholder="명령어 검색..."
              autoFocus
              className="slash-command-input"
            />
          </div>
          <div className="slash-commands-list">
            {filteredCommands.map((command) => (
              <button
                key={command.name}
                className="slash-command-item"
                onClick={() => handleSlashCommandSelect(command.name)}
              >
                <span className="slash-command-icon">{command.icon}</span>
                <span className="slash-command-label">{command.label}</span>
              </button>
            ))}
            {filteredCommands.length === 0 && (
              <div className="slash-command-no-results">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteEditor; 