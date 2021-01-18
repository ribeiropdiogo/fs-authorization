
make: 
	sudo umount ../filesystem
	gcc -Wall passthrough.c `pkg-config fuse3 --cflags --libs` -lcurl -o passthrough
	sudo ./passthrough -o allow_other,modules=subdir,subdir=../actual ../filesystem
	
initial: 
	gcc -Wall passthrough.c `pkg-config fuse3 --cflags --libs` -lcurl -o passthrough
	sudo ./passthrough -o allow_other,modules=subdir,subdir=../actual ../filesystem
	
