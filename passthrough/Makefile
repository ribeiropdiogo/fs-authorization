CC = /usr/bin/gcc

CFLAGS = -lcurl
PKGFLAGS = `pkg-config fuse3 --cflags --libs ` -D_FILE_OFFSET_BITS=64

DIR = /home/lpbf/Desktop/TP3/passthrough/
TARGET = passthrough
FS = $(DIR)filesystem
ACTUAL = $(DIR)actual

all: compile run

end: umount clean

compile:
	$(CC) -Wall $(TARGET).c $(EMAIL) $(PKGFLAGS) $(CFLAGS) -o $(TARGET)

run:
	mkdir -p $(FS)
	mkdir -p $(ACTUAL) 
	sudo ./$(TARGET) -o allow_other,modules=subdir,subdir=$(ACTUAL) $(FS) 

umount:
	sudo umount $(FS)

clean:
	rm -rf $(FS)
	rm $(TARGET)
