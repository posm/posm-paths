class SequenceHandler(RequestHandler):
    def post(self, dir_name_array):
        # response
        try:
            # get the image paths
            # cut them into sequences
            # move them to path /sequence/<sequence_id>/
            # do the sequence generating
            self.set_status(200)

        except:
            self.write_error()

        finally:
            self.finish()   
