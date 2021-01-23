CC = /usr/bin/gcc

CFLAGS = -lcurl
PKGFLAGS = `pkg-config fuse3 --cflags --libs ` -D_FILE_OFFSET_BITS=64

DIR = ./
TARGET = passthrough
MOUNT = $(DIR)filesystem
ACT = $(DIR)actualdir

all: compile run

end: umount clean

compile:
	$(CC) -Wall $(TARGET).c $(PKGFLAGS) $(CFLAGS) -o $(TARGET)

run:
	mkdir -p $(MOUNT)
	mkdir -p $(ACT)
	sudo ./$(TARGET) -o allow_other,modules=subdir,subdir=$(ACT) $(MOUNT) 

umount:
	sudo umount $(MOUNT)

clean:
	rm -rf $(MOUNT)
	rm -rf $(ACT)
	rm $(TARGET)

