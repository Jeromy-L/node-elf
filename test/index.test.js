var elf = require('index');


describe('elf', function() {
    
  it('should export load', function() {
    expect(elf.load).to.be.a('function');
  });
  
  describe('loading lua executable on 32-bit Linux', function() {
    it('should parse correctly', function(done) {
      elf.load('test/data/lua-5.2.1_Linux26_bin/lua52', function(err, file) {
        expect(err).to.be.null;
        
        /*
        console.log('type: ' + file.type);
        console.log('machine: ' + file.machine);
        console.log('version: ' + file.version);
        console.log('entry: ' + file.entry);
        console.log('phoff: ' + file.phoff);
        console.log('shoff: ' + file.shoff);
        console.log('flags: ' + file.flags);
        console.log('ehsize: ' + file.ehsize);
        console.log('phentsize: ' + file.phentsize);
        console.log('phnum: ' + file.phnum);
        console.log('shentsize: ' + file.shentsize);
        console.log('shnum: ' + file.shnum);
        console.log('shstrndx: ' + file.shstrndx);
        */
        
        expect(file.enc).to.equal(elf.Encoding.LSB);
        expect(file.type).to.equal(elf.Type.EXECUTABLE);
        expect(file.machine).to.equal(elf.Machine.I386);
        expect(file.version).to.equal(elf.Version.CURRENT);
        expect(file.entry).to.equal(134524860); // ???
        expect(file.phoff).to.equal(52);
        expect(file.shoff).to.equal(134068);
        expect(file.flags).to.equal(0);
        expect(file.ehsize).to.equal(52);
        expect(file.phentsize).to.equal(32);
        expect(file.phnum).to.equal(7);
        expect(file.shentsize).to.equal(40);
        expect(file.shnum).to.equal(28);
        expect(file.shstrndx).to.equal(25);
        done();
      });
    });
  });
  
  describe('loading lua executable on 64-bit Linux', function() {
    it('should parse correctly', function(done) {
      elf.load('test/data/lua-5.2.1_Linux26_64_bin/lua52', function(err, file) {
        expect(err).to.be.null;
        
        /*
        console.log('type: ' + file.type);
        console.log('machine: ' + file.machine);
        console.log('version: ' + file.version);
        console.log('entry: ' + file.entry);
        console.log('phoff: ' + file.phoff);
        console.log('shoff: ' + file.shoff);
        console.log('flags: ' + file.flags);
        console.log('ehsize: ' + file.ehsize);
        console.log('phentsize: ' + file.phentsize);
        console.log('phnum: ' + file.phnum);
        console.log('shentsize: ' + file.shentsize);
        console.log('shnum: ' + file.shnum);
        console.log('shstrndx: ' + file.shstrndx);
        */
        
        expect(file.enc).to.equal(elf.Encoding.LSB);
        expect(file.type).to.equal(elf.Type.EXECUTABLE);
        expect(file.machine).to.equal(elf.Machine.X86_64);
        expect(file.version).to.equal(elf.Version.CURRENT);
        expect(file.entry).to.equal(4210496); // ???
        expect(file.phoff).to.equal(64);
        expect(file.shoff).to.equal(181128);
        expect(file.flags).to.equal(0);
        expect(file.ehsize).to.equal(64);
        expect(file.phentsize).to.equal(56);
        expect(file.phnum).to.equal(8);
        expect(file.shentsize).to.equal(64);
        expect(file.shnum).to.equal(30);
        expect(file.shstrndx).to.equal(27);
        done();
      });
    });
  });
  
  describe('loading a Sifteo SVM ELF file', function() {
    it('should parse correctly', function(done) {
      elf.load('test/data/sifteo-cubes/membrane.elf', function(err, file) {
        expect(err).to.be.null;
        expect(file.enc).to.equal(elf.Encoding.LSB);
        expect(file.type).to.equal(elf.Type.EXECUTABLE);
        expect(file.machine).to.equal(elf.Machine.ARM);
        expect(file.version).to.equal(elf.Version.CURRENT);
        expect(file.entry).to.equal(2130706433); // ???
        expect(file.phoff).to.equal(52);
        expect(file.shoff).to.equal(491832);
        expect(file.flags).to.equal(0);
        expect(file.ehsize).to.equal(52);
        expect(file.phentsize).to.equal(32);
        expect(file.phnum).to.equal(4);
        expect(file.shentsize).to.equal(40);
        expect(file.shnum).to.equal(24);
        expect(file.shstrndx).to.equal(21);
        
        expect(file.sheaders).to.have.length(24);
        
        expect(file.sheaders[0].namendx).to.equal(0);
        expect(file.sheaders[0].name).to.be.undefined;
        expect(file.sheaders[0].type).to.equal(0);
        expect(file.sheaders[0].flags).to.equal(0);
        expect(file.sheaders[0].addr).to.equal(0);
        expect(file.sheaders[0].offset).to.equal(0);
        expect(file.sheaders[0].size).to.equal(0);
        expect(file.sheaders[0].link).to.equal(0);
        expect(file.sheaders[0].info).to.equal(0);
        expect(file.sheaders[0].addralign).to.equal(0);
        expect(file.sheaders[0].entsize).to.equal(0);
        
        expect(file.sheaders[19].namendx).to.equal(207);
        expect(file.sheaders[19].name).to.equal('.metadata');
        
        expect(file.sheaders[21].namendx).to.equal(173);
        expect(file.sheaders[21].name).to.equal('.shstrtab');
        expect(file.sheaders[21].type).to.equal(3);
        expect(file.sheaders[21].flags).to.equal(0);
        expect(file.sheaders[21].addr).to.equal(0);
        expect(file.sheaders[21].offset).to.equal(490203);
        expect(file.sheaders[21].size).to.equal(265);
        expect(file.sheaders[21].link).to.equal(0);
        expect(file.sheaders[21].info).to.equal(0);
        expect(file.sheaders[21].addralign).to.equal(1);
        expect(file.sheaders[21].entsize).to.equal(0);
        
        done();
      });
    });
  });
  
  it('should export capacity constants', function() {
    expect(elf.Capacity.NONE).to.equal(0);
    expect(elf.Capacity.A32BIT).to.equal(1);
    expect(elf.Capacity.A64BIT).to.equal(2);
  });
  
  it('should export encoding constants', function() {
    expect(elf.Encoding.NONE).to.equal(0);
    expect(elf.Encoding.LSB).to.equal(1);
    expect(elf.Encoding.LE).to.equal(1);
    expect(elf.Encoding.MSB).to.equal(2);
    expect(elf.Encoding.BE).to.equal(2);
  });
  
  it('should export type constants', function() {
    expect(elf.Type.NONE).to.equal(0);
    expect(elf.Type.RELOCATABLE).to.equal(1);
    expect(elf.Type.EXECUTABLE).to.equal(2);
    expect(elf.Type.DYNAMIC).to.equal(3);
    expect(elf.Type.CORE).to.equal(4);
  });
  
  it('should export machine constants', function() {
    expect(elf.Machine.NONE).to.equal(0);
    expect(elf.Machine.M32).to.equal(1);
    expect(elf.Machine.SPARC).to.equal(2);
    expect(elf.Machine.I386).to.equal(3);
    expect(elf.Machine.M68K).to.equal(4);
    expect(elf.Machine.M88K).to.equal(5);
    expect(elf.Machine.I860).to.equal(7);
    expect(elf.Machine.MIPS).to.equal(8);
    expect(elf.Machine.MIPS_RS4_BE).to.equal(10);
    expect(elf.Machine.ARM).to.equal(40);
    expect(elf.Machine.X86_64).to.equal(62);
  });
  
  it('should export version constants', function() {
    expect(elf.Version.NONE).to.equal(0);
    expect(elf.Version.CURRENT).to.equal(1);
  });
  
});
