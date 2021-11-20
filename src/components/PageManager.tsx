import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  List,
  ListItem,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DesignIcon, EditIcon, PagesIcon } from '@cofe/icons';
import { DeletePage } from './DeletePage';
import { EditApp } from './EditApp';
import { EditPage } from './EditPage';
import { useAppValue } from '@/hooks/useApp';
import { useEditor } from '@/hooks/useEditor';
import {
  CHAR_COMMAND_KEY,
  CHAR_SHIFT_KEY,
  useShortcut,
} from '@/hooks/useShortcut';

export const PageManager = () => {
  const { pages } = useAppValue();
  const { id, switchPage } = useEditor();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useShortcut(
    `${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}M`,
    useCallback(
      (e) => {
        e.preventDefault();
        onOpen();
      },
      [onOpen],
    ),
  );

  const entries = Object.entries(pages);
  const canDelete = entries.length > 1;

  return (
    <>
      <IconButton
        aria-label="应用与页面"
        title={`应用与页面 [${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}M]`}
        icon={<PagesIcon />}
        onClick={onOpen}
        variant="ghost"
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>应用与页面</DrawerHeader>
          <DrawerBody as={List} spacing={3}>
            {entries.map(([_id, page]) => (
              <ListItem key={_id} as={HStack}>
                <Box flex={1}>{page.title}</Box>
                <EditPage page={page} />
                {canDelete && <DeletePage page={page} />}
                <IconButton
                  aria-label="设计"
                  title="设计"
                  icon={<DesignIcon />}
                  variant="ghost"
                  isDisabled={id === _id}
                  onClick={() => {
                    switchPage(page);

                    onClose();
                  }}
                />
              </ListItem>
            ))}
          </DrawerBody>
          <DrawerFooter as={HStack} justifyContent="space-between">
            <EditApp
              trigger={<Button leftIcon={<EditIcon />}>编辑应用</Button>}
            />
            <EditPage
              trigger={<Button leftIcon={<AddIcon />}>创建页面</Button>}
              page={{ title: '', description: '' }}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
