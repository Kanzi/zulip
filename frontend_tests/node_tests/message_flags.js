zrequire('unread');
zrequire('unread_ops');
zrequire('message_flags');

set_global('ui', {});
set_global('channel', {});

run_test('starred', () => {
    const message = {
        id: 50,
    };

    var ui_updated;

    ui.update_starred = () => {
        ui_updated = true;
    };

    var posted_data;

    channel.post = (opts) => {
        assert.equal(opts.url, '/json/messages/flags');
        posted_data = opts.data;
    };

    message_flags.toggle_starred(message);

    assert(ui_updated);

    assert.deepEqual(posted_data, {
        messages: '[50]',
        flag: 'starred',
        op: 'add',
    });

    assert.deepEqual(message, {
        id: 50,
        starred: true,
    });

    ui_updated = false;

    message_flags.toggle_starred(message);

    assert(ui_updated);

    assert.deepEqual(posted_data, {
        messages: '[50]',
        flag: 'starred',
        op: 'remove',
    });

    assert.deepEqual(message, {
        id: 50,
        starred: false,
    });
});
