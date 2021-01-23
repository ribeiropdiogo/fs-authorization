CC = /usr/bin/gcc

CFLAGS = -lcurl
PKGFLAGS = `pkg-config fuse3 --cflags --libs ` -D_FILE_OFFSET_BITS=64

DIR = ./
TARGET = passthrough
MOUNT = $(DIR)filesystem

all: compile run

end: umount clean

compile:
	$(CC) -Wall $(TARGET).c $(PKGFLAGS) $(CFLAGS) -o $(TARGET)

run:
	mkdir -p $(MOUNT)
	./$(TARGET) $(MOUNT) -o allow_other

umount:
	umount $(MOUNT)

clean:
	rm -rf $(MOUNT)
	rm $(TARGET)
