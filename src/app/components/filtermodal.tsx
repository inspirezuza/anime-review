import {
  Tabs,
  Tab,
  Switch,
  Input,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  nsfw: boolean;
  setNSFW: (value: boolean) => void;
  genres: any[];
  setFilter: (value: any) => void;
  filters: any[];
}

export default function FilterModal({
  isOpen,
  onClose,
  nsfw,
  setNSFW,
  genres,
  setFilter,
  filters,
}: FilterModalProps) {
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      disableAnimation={true}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="">
              <div className="w-full h-full p-2">
                <Button
                  color={nsfw ? "secondary" : "default"}
                  variant="solid"
                  onPress={() => setNSFW(!nsfw)}
                >
                  NSFW
                </Button>
                {genres &&
                  genres.map((genre) => (
                    <Button
                      color={
                        filters?.includes(genre.id) ? "secondary" : "default"
                      }
                      onPress={() => {
                        setFilter(genre.id);
                      }}
                      variant="solid"
                    >
                      {genre.genrename}
                    </Button>
                  ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Done
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
