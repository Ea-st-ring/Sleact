import React, { VFC, useCallback, forwardRef, RefObject } from 'react';
import { ChatZone, Section, StickyHeader } from './styles';
import { IChat, IDM } from '@typings/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd: boolean;
  ref: RefObject<Scrollbars> | ((instance: Scrollbars | null) => void);
}

const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isReachingEnd }, ref) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      setSize((prevSize) => prevSize + 1).then(() => {
        // 스크롤 위치 유지
        if (typeof ref === 'object' && ref?.current) {
          ref.current.scrollTop(ref.current.getScrollHeight() - values.scrollHeight);
        }
      });
    }
  }, []);

  if (!chatSections) {
    return <ChatZone></ChatZone>;
  }
  return (
    <ChatZone>
      <Scrollbars autoHide ref={ref as RefObject<Scrollbars>} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => (
          <Section className={`section-${date}`} key={date}>
            <StickyHeader className="section-title">
              <button>2023-11-22 18:00:07</button>
            </StickyHeader>
            {chats.map((chat) => (
              <Chat key={chat.id} data={chat as IDM} />
            ))}
          </Section>
        ))}
      </Scrollbars>
    </ChatZone>
  );
});

export default ChatList;
